-- 0006_past_events_schema.sql
--
-- Nouveau cluster "Événements passés" — INDÉPENDANT de la table `events`.
--
-- Principe : un événement annoncé (`events`) n'est JAMAIS transformé
-- automatiquement en "passé", ni caché, ni modifié en fonction de sa date.
-- Il reste affiché tel quel tant que is_published = true. Le récapitulatif
-- d'un événement qui s'est déroulé (photos, vidéos, retour) est un contenu
-- à part entière, ajouté manuellement une fois l'événement terminé — d'où
-- une table dédiée plutôt qu'un champ "status" sur `events`.
--
-- ⚠️ VÉRIFICATION MANUELLE AVANT D'EXÉCUTER (section 3) :
-- Je n'ai pas d'accès direct à votre base, donc je ne peux pas garantir le
-- nom exact de la contrainte CHECK sur media.owner_type (si elle existe).
-- Lancez d'abord ceci dans le SQL Editor Supabase :
--
--   select conname, pg_get_constraintdef(oid)
--   from pg_constraint
--   where conrelid = 'media'::regclass and contype = 'c';
--
-- Si le résultat montre une contrainte sur owner_type dont le nom diffère
-- de 'media_owner_type_check', remplacez ce nom dans la section 3 avant de
-- lancer ce script. Si aucune contrainte n'apparaît, la section 3 ne fera
-- rien (pas d'erreur) et vous pouvez insérer owner_type='past_event' sans
-- souci dès maintenant.

-- =====================================================================
-- 1. Table principale
-- =====================================================================

create table if not exists past_events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  occurred_on date not null,          -- date représentative de l'événement, sert au tri (plus récent → plus ancien)
  is_published boolean not null default false,
  created_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_past_events_occurred_on on past_events (occurred_on desc);
create index if not exists idx_past_events_is_published on past_events (is_published);

-- =====================================================================
-- 2. Traductions — même pattern que event_translations (table sœur "_translations")
-- =====================================================================

create table if not exists past_event_translations (
  id uuid primary key default gen_random_uuid(),
  past_event_id uuid not null references past_events(id) on delete cascade,
  locale text not null check (locale in ('fr', 'en', 'de')),
  title text not null,
  description text not null,
  location_name text,
  unique (past_event_id, locale)
);

-- =====================================================================
-- 3. Photo de couverture : réutilise la table `media` polymorphe existante
--    (owner_type='past_event', owner_id=past_events.id, is_cover=true),
--    exactement comme pour les autres types de contenu.
-- =====================================================================

do $$
begin
  if exists (
    select 1 from pg_constraint
    where conrelid = 'media'::regclass
      and contype = 'c'
      and conname = 'media_owner_type_check'
  ) then
    alter table media drop constraint media_owner_type_check;
    alter table media add constraint media_owner_type_check
      check (owner_type in ('event', 'news', 'project', 'profile', 'gallery_album', 'past_event'));
  end if;
end $$;

-- =====================================================================
-- 4. Galerie photo/vidéo de l'événement passé : nouvelle colonne sur
--    gallery_media (déjà en place), même principe que related_event_id.
--    on delete set null : si un past_event est supprimé, les médias déjà
--    uploadés restent dans le flux terrain général au lieu de disparaître.
-- =====================================================================

alter table gallery_media
  add column if not exists related_past_event_id uuid references past_events(id) on delete set null;

create index if not exists idx_gallery_media_related_past_event on gallery_media (related_past_event_id);

-- =====================================================================
-- 5. updated_at automatique
-- =====================================================================

create or replace function past_events_touch_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_past_events_touch_updated_at on past_events;
create trigger trg_past_events_touch_updated_at
  before update on past_events
  for each row execute function past_events_touch_updated_at();

-- =====================================================================
-- 6. RLS — pattern à 3 rôles (SUPER_ADMIN / EDITOR / OBSERVATOR), calqué
--    sur celui documenté pour `events`. À comparer avec vos policies
--    existantes sur `events` pour garder un nommage cohérent si elles
--    utilisent une fonction helper (ex. is_staff()) plutôt que des EXISTS
--    inline comme ici.
-- =====================================================================

alter table past_events enable row level security;
alter table past_event_translations enable row level security;

create policy "public read published past_events"
  on past_events for select
  using (is_published = true);

create policy "public read published past_event_translations"
  on past_event_translations for select
  using (
    exists (
      select 1 from past_events
      where past_events.id = past_event_translations.past_event_id
        and past_events.is_published = true
    )
  );

create policy "staff read all past_events"
  on past_events for select
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
        and profiles.role in ('SUPER_ADMIN', 'EDITOR', 'OBSERVATOR')
    )
  );

create policy "staff read all past_event_translations"
  on past_event_translations for select
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
        and profiles.role in ('SUPER_ADMIN', 'EDITOR', 'OBSERVATOR')
    )
  );

create policy "editors insert past_events"
  on past_events for insert
  with check (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
        and profiles.role in ('SUPER_ADMIN', 'EDITOR')
    )
  );

create policy "editors update past_events"
  on past_events for update
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
        and profiles.role in ('SUPER_ADMIN', 'EDITOR')
    )
  );

create policy "editors insert past_event_translations"
  on past_event_translations for insert
  with check (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
        and profiles.role in ('SUPER_ADMIN', 'EDITOR')
    )
  );

create policy "editors update past_event_translations"
  on past_event_translations for update
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
        and profiles.role in ('SUPER_ADMIN', 'EDITOR')
    )
  );

create policy "super_admin delete past_events"
  on past_events for delete
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
        and profiles.role = 'SUPER_ADMIN'
    )
  );

create policy "super_admin delete past_event_translations"
  on past_event_translations for delete
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
        and profiles.role = 'SUPER_ADMIN'
    )
  );
