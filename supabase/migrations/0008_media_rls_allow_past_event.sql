-- 0008_media_rls_allow_past_event.sql
--
-- Corrige la policy SELECT publique sur `media` : elle avait une branche OR
-- par owner_type (event / news / project / profile) écrite avant l'ajout
-- de 'past_event' (migration 0006). Sans cette branche, l'anon key ne peut
-- jamais lire une ligne media avec owner_type='past_event', même publiée
-- côté past_events — d'où la photo de couverture invisible sur le site
-- alors que la ligne existe bien en base.
--
-- On ne touche à rien d'autre : mêmes 4 branches existantes, une 5e ajoutée.

drop policy if exists "Tout le monde peut voir les médias liés à un contenu publié" on media;

create policy "Tout le monde peut voir les médias liés à un contenu publié"
  on media for select
  using (
    (owner_type = 'event' and exists (
      select 1 from events e where e.id = media.owner_id and e.is_published
    ))
    or (owner_type = 'news' and exists (
      select 1 from news_articles n where n.id = media.owner_id and n.is_published
    ))
    or (owner_type = 'project' and exists (
      select 1 from projects p where p.id = media.owner_id and p.is_published
    ))
    or (owner_type = 'profile')
    or (owner_type = 'past_event' and exists (
      select 1 from past_events pe where pe.id = media.owner_id and pe.is_published
    ))
  );

-- Vérification après exécution :
-- select policyname, qual from pg_policies where tablename = 'media' and cmd = 'SELECT';
