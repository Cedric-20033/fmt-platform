// lib/data/past-events.ts
import { createClient } from "@/lib/supabase/server";
import { getMediaForOwners } from "@/lib/data/media";
import type { PastEvent } from "@/types/entities";

type Locale = PastEvent["locale"];

interface RawTranslation {
  locale: Locale;
  title: string;
  description: string;
  location_name: string | null;
}

interface RawPastEventRow {
  id: string;
  slug: string;
  occurred_on: string;
  created_at: string;
  updated_at: string;
  past_event_translations: RawTranslation[];
}

/**
 * Sélectionne la traduction correspondant à la locale demandée.
 * @param rows - tableau de traductions disponibles pour un événement
 * @param locale - locale demandée 
 * @returns 
 */
function pickLocale(rows: RawTranslation[], locale: Locale): RawTranslation | undefined {
  return rows.find((r) => r.locale === locale) ?? rows.find((r) => r.locale === "fr") ?? rows[0];
}

/**
 * Récupère les événements passés publiés, triés du plus récent au plus
 * ancien (occurred_on desc). Complètement indépendant de getEvents() —
 * lit past_events + past_event_translations, jamais la table events.
 */
export async function getPastEvents(locale: Locale): Promise<PastEvent[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("past_events")
    .select(
      `id, slug, occurred_on, created_at, updated_at,
       past_event_translations ( locale, title, description, location_name )`
    )
    .eq("is_published", true)
    .order("occurred_on", { ascending: false });

  if (error) {
    console.error("getPastEvents error:", error.message);
    return [];
  }

  const rows = (data ?? []) as unknown as RawPastEventRow[];
  if (rows.length === 0) return [];

  const coverByOwner = await getMediaForOwners(
    "past_event",
    rows.map((r) => r.id)
  );

  return rows
    .map((row): PastEvent | null => {
      const translation = pickLocale(row.past_event_translations, locale);
      if (!translation) return null;

      const media = coverByOwner.get(row.id) ?? [];
      const cover = media.find((m) => m.is_cover) ?? media[0] ?? null;

      return {
        id: row.id,
        slug: row.slug,
        locale,
        occurred_on: row.occurred_on,
        title: translation.title,
        description: translation.description,
        location_name: translation.location_name,
        cover,
        created_at: row.created_at,
        updated_at: row.updated_at,
      };
    })
    .filter((e): e is PastEvent => e !== null);
}
