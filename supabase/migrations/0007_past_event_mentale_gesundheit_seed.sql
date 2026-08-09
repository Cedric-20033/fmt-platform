-- 0007_past_event_mentale_gesundheit_seed.sql
--
-- Données : événement passé "Mentale Gesundheit in der Afrodiasporischen
-- Community" — traductions FR/EN/DE + photo de couverture (déjà uploadée
-- sur Cloudinary manuellement, storage_ref fourni).
--
-- ⚠️ Prérequis : 0006_past_events_schema.sql doit déjà avoir été exécutée.
--
-- ⚠️ À REMPLACER avant exécution : la date de l'événement (ligne marquée TODO).

begin;

with new_past_event as (
  insert into past_events (slug, occurred_on, is_published, created_by)
  values (
    'mentale-gesundheit-2026',
    '2026-07-18', -- TODO: remplacer par la date réelle de l'événement (format YYYY-MM-DD)
    true,
    null -- remplacez par l'id d'un profile (uuid) si vous voulez tracer qui a ajouté cette entrée
  )
  returning id
),
new_translations as (
  insert into past_event_translations (past_event_id, locale, title, description, location_name)
  select new_past_event.id, v.locale, v.title, v.description, v.location_name
  from new_past_event,
  (values
    (
      'de',
      'Mentale Gesundheit in der Afrodiasporischen Community',
      'Unsere Konferenz „Mentale Gesundheit in der Afrodiasporischen Community" war geprägt von wertvollen Begegnungen, inspirierenden Expertinnen und Experten sowie einem offenen, bereichernden Austausch. Von Herzen danken wir allen Referentinnen und Referenten, Teilnehmenden, Helferinnen und Helfern sowie Unterstützerinnen und Unterstützern, die diesen Tag möglich gemacht haben. Gemeinsam zeigen wir: Hilfe braucht kein Diplom – Hilfe braucht Herz.',
      null::text
    ),
    (
      'fr',
      'La santé mentale au sein de la communauté afro-diasporique',
      'Notre conférence « La santé mentale au sein de la communauté afro-diasporique » a été marquée par des rencontres enrichissantes, la présence d''experts inspirants et des échanges ouverts. Un grand merci à tous les intervenants, participants, bénévoles et soutiens qui ont rendu cette journée possible. Ensemble, nous montrons que pour aider, pas besoin d''un diplôme – il suffit d''avoir du cœur.',
      null::text
    ),
    (
      'en',
      'Mental Health in the Afro-Diasporic Community',
      'Our conference "Mental Health in the Afro-Diasporic Community" was marked by valuable encounters, inspiring experts, and open, enriching exchanges. Heartfelt thanks to all the speakers, participants, volunteers, and supporters who made this day possible. Together, we show that helping doesn''t require a diploma – it requires heart.',
      null::text
    )
  ) as v(locale, title, description, location_name)
  returning past_event_id
),
new_cover as (
  insert into media (owner_type, owner_id, type, provider, storage_ref, alt, is_cover, "order")
  select
    'past_event',
    new_past_event.id,
    'image',
    'cloudinary',
    'WhatsApp_Image_2026-08-08_at_13.34.189_rid2ih',
    'Photo de groupe — conférence Santé mentale dans la communauté afro-diasporique, FMT e.V.',
    true,
    0
  from new_past_event
  returning id, owner_id
)
select
  (select id from new_past_event) as past_event_id,
  (select count(*) from new_translations) as translations_inserted,
  (select id from new_cover) as cover_media_id;

commit;

-- Vérification rapide après exécution :
-- select pe.slug, pe.occurred_on, pe.is_published, pet.locale, pet.title
-- from past_events pe
-- join past_event_translations pet on pet.past_event_id = pe.id
-- where pe.slug = 'mentale-gesundheit-2026';
