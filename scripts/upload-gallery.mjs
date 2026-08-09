// scripts/upload-gallery.mjs
//
// Parcourt un dossier local, upload chaque image/vidéo sur Cloudinary,
// puis insère la ligne correspondante dans Supabase (table gallery_media).
//
// USAGE :
//   node --env-file=.env.local scripts/upload-gallery.mjs
//   node --env-file=.env.local scripts/upload-gallery.mjs "/chemin/personnalise"
//
// LIER DES PHOTOS/VIDÉOS À LA GALERIE D'UN ÉVÉNEMENT PASSÉ (bouton "Voir
// la galerie" sur sa card) :
//   node --env-file=.env.local scripts/upload-gallery.mjs "/chemin" --past-event=mentale-gesundheit-2026
// (le slug doit exister dans la table past_events, exécutez d'abord la
// migration 0006 et créez la ligne past_events correspondante)
//
// DÉFINIR LA PHOTO D'ENTÊTE DE LA CARD ÉVÉNEMENT PASSÉ (table media,
// PAS gallery_media — une seule photo, distincte de la galerie) :
//   node --env-file=.env.local scripts/upload-gallery.mjs "/chemin/vers/1-seule-photo" --cover-for=mentale-gesundheit-2026
//
// Variables requises dans .env.local :
//   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
//   CLOUDINARY_API_KEY
//   CLOUDINARY_API_SECRET
//   NEXT_PUBLIC_SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY   <-- clé service (jamais la clé anon ici)
//
// Le script est SÛR à relancer plusieurs fois : chaque fichier traité avec
// succès est enregistré dans scripts/.gallery-upload-manifest.json et ne
// sera jamais renvoyé une seconde fois, même après une coupure réseau
// ou un Ctrl+C en plein milieu.

import { v2 as cloudinary } from "cloudinary";
import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync, existsSync, statSync, readdirSync } from "node:fs";
import { join, extname, basename, resolve } from "node:path";
import { homedir } from "node:os";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

// ---------------------------------------------------------------------
// 0. Configuration
// ---------------------------------------------------------------------

const cliArgs = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const pastEventFlag = process.argv.slice(2).find((a) => a.startsWith("--past-event="));
const coverForFlag = process.argv.slice(2).find((a) => a.startsWith("--cover-for="));
const PAST_EVENT_SLUG = pastEventFlag ? pastEventFlag.split("=")[1] : null;
const COVER_FOR_SLUG = coverForFlag ? coverForFlag.split("=")[1] : null;

if (PAST_EVENT_SLUG && COVER_FOR_SLUG) {
  console.error("\n✗ --past-event et --cover-for sont mutuellement exclusifs (deux tables cibles différentes). Lancez le script deux fois séparément.\n");
  process.exit(1);
}

const SOURCE_DIR = resolve(cliArgs[0] || join(homedir(), "Desktop", "upload"));
const MANIFEST_PATH = resolve("scripts/.gallery-upload-manifest.json");
const FAILURES_LOG_PATH = resolve("scripts/upload-failures.log");

const IMAGE_EXT = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".heic", ".heif", ".bmp", ".tiff"];
const VIDEO_EXT = [".mp4", ".mov", ".webm", ".m4v", ".avi", ".mkv"];

const REQUIRED_ENV = [
  "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
];

// ---------------------------------------------------------------------
// 1. Vérifications avant de démarrer (fail fast, pas de surprise en cours de route)
// ---------------------------------------------------------------------

function checkEnv() {
  const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.error(`\n✗ Variables d'environnement manquantes : ${missing.join(", ")}`);
    console.error(`  Vérifiez votre .env.local et lancez avec : node --env-file=.env.local scripts/upload-gallery.mjs\n`);
    process.exit(1);
  }
}

function checkSourceDir() {
  if (!existsSync(SOURCE_DIR)) {
    console.error(`\n✗ Le dossier n'existe pas : ${SOURCE_DIR}`);
    console.error(`  Passez le bon chemin en argument : node scripts/upload-gallery.mjs "/chemin/vers/vos/fichiers"\n`);
    process.exit(1);
  }
}

// ---------------------------------------------------------------------
// 2. Parcours récursif du dossier
// ---------------------------------------------------------------------

function walkDir(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue; // ignore fichiers cachés (.DS_Store etc.)
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkDir(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

function classify(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (IMAGE_EXT.includes(ext)) return "image";
  if (VIDEO_EXT.includes(ext)) return "video";
  return null; // non supporté, sera ignoré
}

// ---------------------------------------------------------------------
// 3. Manifest (mémoire des fichiers déjà traités avec succès)
// ---------------------------------------------------------------------

function loadManifest() {
  if (!existsSync(MANIFEST_PATH)) return {};
  try {
    return JSON.parse(readFileSync(MANIFEST_PATH, "utf-8"));
  } catch {
    console.warn("⚠ Manifest illisible, il sera recréé depuis zéro.");
    return {};
  }
}

function saveManifestEntry(manifest, filePath, entry) {
  manifest[filePath] = entry;
  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
}

function appendFailureLog(filePath, errorMessage) {
  const line = `[${new Date().toISOString()}] ${filePath} — ${errorMessage}\n`;
  writeFileSync(FAILURES_LOG_PATH, line, { flag: "a" });
}

// ---------------------------------------------------------------------
// 4. Petit utilitaire de retry (réseau instable, timeout ponctuel...)
// ---------------------------------------------------------------------

async function withRetry(fn, { attempts = 3, delayMs = 2000, label = "" } = {}) {
  let lastError;
  for (let i = 1; i <= attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i < attempts) {
        console.warn(`  ⚠ ${label} a échoué (tentative ${i}/${attempts}), nouvel essai dans ${delayMs / 1000}s...`);
        await new Promise((r) => setTimeout(r, delayMs));
      }
    }
  }
  throw lastError;
}

// ---------------------------------------------------------------------
// 5. Upload Cloudinary
// ---------------------------------------------------------------------

async function uploadToCloudinary(filePath, type) {
  // Pas de paramètre "folder" volontairement : sur un compte avec Dynamic Folders
  // activé, le comportement de préfixage du public_id n'est pas garanti (voir
  // l'incident où un public_id supposé préfixé s'est révélé plat à l'usage).
  // On stocke donc à plat, et on utilise des tags pour rester organisé dans
  // Cloudinary sans jamais toucher au public_id réel.
  const options = {
    resource_type: type, // "image" ou "video" — explicite, pas de "auto" pour rester prévisible
    use_filename: true,
    unique_filename: true,
    overwrite: false,
    tags: ["site-gallery"],
  };

  if (type === "video") {
    // upload_large : nécessaire pour les vidéos volumineuses (upload par morceaux)
    return cloudinary.uploader.upload_large(filePath, options);
  }
  return cloudinary.uploader.upload(filePath, options);
}

// Résout un slug past_events en id, ou quitte proprement si introuvable.
async function resolvePastEventId(supabase, slug) {
  const { data, error } = await supabase.from("past_events").select("id, slug").eq("slug", slug).maybeSingle();
  if (error || !data) {
    console.error(`\n✗ Aucun événement passé trouvé avec le slug "${slug}". Vérifiez past_events.slug en base (migration 0006 + ligne créée ?).\n`);
    process.exit(1);
  }
  return data.id;
}

// ---------------------------------------------------------------------
// 5bis. Mode --cover-for : une SEULE photo, insérée dans `media`
//       (owner_type='past_event', is_cover=true) — PAS dans gallery_media.
// ---------------------------------------------------------------------

async function runCoverUpload(supabase, pastEventId, slug) {
  const allFiles = walkDir(SOURCE_DIR);
  const candidates = allFiles
    .map((filePath) => ({ filePath, type: classify(filePath) }))
    .filter((f) => f.type === "image"); // une couverture est toujours une image

  if (candidates.length === 0) {
    console.error(`\n✗ Aucune image trouvée dans ${SOURCE_DIR}.\n`);
    process.exit(1);
  }
  if (candidates.length > 1) {
    console.error(
      `\n✗ ${candidates.length} images trouvées dans ce dossier, mais --cover-for attend UNE SEULE photo de couverture.\n` +
        `  Isolez la photo voulue dans un dossier dédié et relancez.\n`
    );
    process.exit(1);
  }

  const { filePath } = candidates[0];
  const name = basename(filePath);

  const { data: existingCover } = await supabase
    .from("media")
    .select("id")
    .eq("owner_type", "past_event")
    .eq("owner_id", pastEventId)
    .eq("is_cover", true)
    .maybeSingle();

  if (existingCover) {
    const rl = readline.createInterface({ input, output });
    const answer = await rl.question(
      `⚠ Une photo de couverture existe déjà pour "${slug}" (media.id=${existingCover.id}). La remplacer ? (o/n) `
    );
    rl.close();
    if (answer.trim().toLowerCase() !== "o") {
      console.log("Annulé par l'utilisateur.");
      return;
    }
    await supabase.from("media").delete().eq("id", existingCover.id);
  }

  console.log(`\nUpload de la couverture "${name}" pour l'événement passé "${slug}"...`);

  const uploadResult = await withRetry(() => uploadToCloudinary(filePath, "image"), { label: "upload Cloudinary" });
  console.log(`✓ Cloudinary OK — public_id=${uploadResult.public_id} ${uploadResult.width}x${uploadResult.height}`);

  const altText = basename(filePath, extname(filePath)).replace(/[_-]+/g, " ").trim();

  const { data: insertedRow, error: insertError } = await supabase
    .from("media")
    .insert({
      owner_type: "past_event",
      owner_id: pastEventId,
      type: "image",
      provider: "cloudinary",
      storage_ref: uploadResult.public_id,
      alt: altText || null,
      caption: null,
      is_cover: true,
      order: 0,
      width: uploadResult.width ?? null,
      height: uploadResult.height ?? null,
      duration_seconds: null,
    })
    .select("id")
    .single();

  if (insertError) {
    console.error(`\n✗ Uploadé sur Cloudinary mais échec de l'insertion Supabase : ${insertError.message}`);
    console.error(`  public_id Cloudinary à récupérer manuellement si besoin : ${uploadResult.public_id}\n`);
    process.exit(1);
  }

  console.log(`✓ Supabase OK — media.id=${insertedRow.id}\n`);
  console.log("Terminé.\n");
}

// ---------------------------------------------------------------------
// 6. Programme principal
// ---------------------------------------------------------------------

async function main() {
  checkEnv();
  checkSourceDir();

  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY // clé service : contourne volontairement le RLS, script de confiance
  );

  // ---- Mode couverture : sort du flux normal, une seule photo, autre table ----
  if (COVER_FOR_SLUG) {
    const pastEventId = await resolvePastEventId(supabase, COVER_FOR_SLUG);
    await runCoverUpload(supabase, pastEventId, COVER_FOR_SLUG);
    return;
  }

  let relatedPastEventId = null;
  if (PAST_EVENT_SLUG) {
    relatedPastEventId = await resolvePastEventId(supabase, PAST_EVENT_SLUG);
    console.log(`\nLiaison activée : chaque média sera rattaché à la galerie de l'événement passé "${PAST_EVENT_SLUG}" (id=${relatedPastEventId})`);
  }

  const allFiles = walkDir(SOURCE_DIR);
  const candidates = allFiles
    .map((filePath) => ({ filePath, type: classify(filePath) }))
    .filter((f) => f.type !== null);

  const ignoredCount = allFiles.length - candidates.length;

  console.log(`\nDossier source : ${SOURCE_DIR}`);
  console.log(`Fichiers trouvés : ${allFiles.length} (dont ${candidates.length} images/vidéos, ${ignoredCount} ignorés — extension non reconnue)\n`);

  if (candidates.length === 0) {
    console.log("Rien à uploader. Fin du script.");
    return;
  }

  const manifest = loadManifest();
  const alreadyDone = candidates.filter((f) => manifest[f.filePath]?.status === "success");
  const remaining = candidates.filter((f) => manifest[f.filePath]?.status !== "success");

  if (alreadyDone.length > 0) {
    console.log(`${alreadyDone.length} fichier(s) déjà traités précédemment (ignorés grâce au manifest).`);
  }
  console.log(`${remaining.length} fichier(s) à traiter dans cette exécution.\n`);

  if (remaining.length === 0) {
    console.log("Tout est déjà à jour. Fin du script.");
    return;
  }

  // ---- Confirmation avant de lancer potentiellement des dizaines d'uploads ----
  const rl = readline.createInterface({ input, output });
  const answer = await rl.question(`Confirmer l'upload de ${remaining.length} fichier(s) vers Cloudinary + Supabase ? (o/n) `);
  rl.close();
  if (answer.trim().toLowerCase() !== "o") {
    console.log("Annulé par l'utilisateur.");
    return;
  }

  console.log("\nDémarrage...\n");

  let successCount = 0;
  let failureCount = 0;

  for (let i = 0; i < remaining.length; i++) {
    const { filePath, type } = remaining[i];
    const name = basename(filePath);
    const progress = `[${i + 1}/${remaining.length}]`;

    console.log(`${progress} ${name} (${type}) — upload vers Cloudinary...`);

    try {
      const uploadResult = await withRetry(() => uploadToCloudinary(filePath, type), {
        label: "upload Cloudinary",
      });

      if (uploadResult.resource_type !== "image" && uploadResult.resource_type !== "video") {
        throw new Error(`resource_type inattendu retourné par Cloudinary : "${uploadResult.resource_type}"`);
      }

      console.log(
        `${progress} ✓ Cloudinary OK — public_id=${uploadResult.public_id} ${uploadResult.width}x${uploadResult.height} (${uploadResult.format})`
      );

      if (uploadResult.public_id.includes("/")) {
        console.warn(
          `${progress} ⚠ ATTENTION : ce public_id contient un "/" alors qu'aucun dossier n'a été demandé. ` +
            `Vérifiez manuellement que l'image s'affiche bien sur le site avant de faire confiance au reste du lot.`
        );
      }

      const altText = basename(filePath, extname(filePath)).replace(/[_-]+/g, " ").trim();

      const { data: insertedRow, error: insertError } = await withRetry(
        async () => {
          const res = await supabase
            .from("gallery_media")
            .insert({
              type: uploadResult.resource_type,
              provider: "cloudinary",
              storage_ref: uploadResult.public_id,
              alt: altText || null,
              caption: null,
              width: uploadResult.width ?? null,
              height: uploadResult.height ?? null,
              duration_seconds: uploadResult.duration ?? null,
              format: uploadResult.format ?? null,
              related_past_event_id: relatedPastEventId,
              is_published: true,
            })
            .select("id")
            .single();

          if (res.error) throw new Error(res.error.message);
          return res;
        },
        { label: "insertion Supabase" }
      );

      if (insertError) throw new Error(insertError.message);

      console.log(`${progress} ✓ Supabase OK — id=${insertedRow.id}\n`);

      saveManifestEntry(manifest, filePath, {
        status: "success",
        cloudinaryPublicId: uploadResult.public_id,
        supabaseId: insertedRow.id,
        uploadedAt: new Date().toISOString(),
      });

      successCount++;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`${progress} ✗ ÉCHEC — ${name} : ${message}\n`);
      appendFailureLog(filePath, message);
      saveManifestEntry(manifest, filePath, { status: "failed", error: message, failedAt: new Date().toISOString() });
      failureCount++;
    }
  }

  console.log("─".repeat(50));
  console.log(`Terminé.`);
  console.log(`  ✓ Réussis  : ${successCount}`);
  console.log(`  ✗ Échoués  : ${failureCount}`);
  if (failureCount > 0) {
    console.log(`\nDétail des échecs dans : ${FAILURES_LOG_PATH}`);
    console.log(`Relancez simplement le script : les fichiers réussis ne seront pas re-uploadés,`);
    console.log(`seuls les échecs (et les nouveaux fichiers) seront retentés.`);
  }
  console.log("─".repeat(50) + "\n");
}

main().catch((err) => {
  console.error("\n✗ Erreur fatale du script :", err);
  process.exit(1);
});
