// lib/data/event.ts
import { createClient } from "@/lib/supabase/server";
import { getMediaForOwners } from "@/lib/data/media";
import type {
  Event,
  EventContact,
  EventDateSlot,
  EventPartner,
  EventScheduleItem,
  MediaAsset,
} from "@/types/entities";

type Locale = Event["locale"];

interface RawTranslation {
  locale: Locale;
  title: string;
  theme: string | null;
  description: string;
  location_name: string | null;
  location_address: string | null;
}

interface RawScheduleTranslation {
  locale: Locale;
  part_label: string;
  time_range: string;
  title: string;
  description: string | null;
}

interface RawEventRow {
  id: string;
  slug: string;
  is_online: boolean;
  is_free: boolean;
  registration_url: string | null;
  created_at: string;
  updated_at: string;
  event_translations: RawTranslation[];
  event_dates: { id: string; date: string; start_time: string; end_time: string; label: string | null; order: number }[];
  event_schedule: { id: string; order: number; event_schedule_translations: RawScheduleTranslation[] }[];
  event_contacts: { type: "email" | "phone"; value: string; label: string | null }[];
  event_partners: {
    name: string;
    order: number;
    logo: { provider: MediaAsset["provider"]; storage_ref: string; alt: string | null; width: number | null; height: number | null } | null;
  }[];
}

function pickLocale<T extends { locale: Locale }>(rows: T[], locale: Locale): T | undefined {
  return rows.find((r) => r.locale === locale) ?? rows.find((r) => r.locale === "fr") ?? rows[0];
}

export async function getEvents(locale: Locale): Promise<Event[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("events")
    .select(`
      id, slug, is_online, is_free, registration_url, created_at, updated_at,
      event_translations ( locale, title, theme, description, location_name, location_address ),
      event_dates ( id, date, start_time, end_time, label, order ),
      event_schedule (
        id, order,
        event_schedule_translations ( locale, part_label, time_range, title, description )
      ),
      event_contacts ( type, value, label ),
      event_partners ( name, order, logo:media ( provider, storage_ref, alt, width, height ) )
    `)
    .eq("is_published", true)
    .order("date", { referencedTable: "event_dates", ascending: true });

  if (error) {
    console.error("getEvents error:", error.message);
    return [];
  }

  const rows = data as unknown as RawEventRow[];
  const mediaByEvent = await getMediaForOwners("event", rows.map((r) => r.id));

  return rows
    .map((row) => mapEventRow(row, locale, mediaByEvent))
    .filter((e): e is Event => e !== null)
    .sort((a, b) => (a.dates[0]?.date ?? "").localeCompare(b.dates[0]?.date ?? ""));
}

function mapEventRow(row: RawEventRow, locale: Locale, mediaByEvent: Map<string, MediaAsset[]>): Event | null {
  const translation = pickLocale(row.event_translations, locale);
  if (!translation) return null;

  const schedule: EventScheduleItem[] = row.event_schedule
    .map((s) => {
      const t = pickLocale(s.event_schedule_translations, locale);
      if (!t) return null;
      return { id: s.id, order: s.order, part_label: t.part_label, time_range: t.time_range, title: t.title, description: t.description };
    })
    .filter((s): s is EventScheduleItem => s !== null)
    .sort((a, b) => a.order - b.order);

  const dates: EventDateSlot[] = [...row.event_dates]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((d) => ({ id: d.id, date: d.date, start_time: d.start_time, end_time: d.end_time, label: d.label }));

  const contacts: EventContact[] = row.event_contacts.map((c) => ({ type: c.type, value: c.value, label: c.label }));

  const partners: EventPartner[] = [...row.event_partners]
    .sort((a, b) => a.order - b.order)
    .map((p) => ({
      name: p.name,
      logo: p.logo
        ? {
            id: `${row.id}-partner-${p.name}`,
            type: "image" as const,
            provider: p.logo.provider,
            storage_ref: p.logo.storage_ref,
            alt: p.logo.alt ?? p.name,
            is_cover: false,
            order: 0,
            width: p.logo.width,
            height: p.logo.height,
            duration_seconds: null,
          }
        : null,
    }));

  return {
    id: row.id,
    slug: row.slug,
    locale,
    is_online: row.is_online,
    is_free: row.is_free,
    registration_url: row.registration_url,
    title: translation.title,
    theme: translation.theme,
    description: translation.description,
    location_name: translation.location_name,
    location_address: translation.location_address,
    dates,
    schedule,
    contacts,
    partners,
    media: mediaByEvent.get(row.id) ?? [],
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}