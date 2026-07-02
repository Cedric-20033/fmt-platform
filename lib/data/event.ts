// lib/data/event.ts
import type { Event } from "@/types/entities";
import { staticEvents } from "@/lib/data/static/events.data";

export async function getEvents(locale: Event["locale"]): Promise<Event[]> {
  // Plus tard :
  // const { data } = await supabase
  //   .from("events")
  //   .select("*, dates:event_dates(*), schedule:event_schedule(*), contacts:event_contacts(*), partners:event_partners(*), media:event_media(*)")
  //   .eq("locale", locale)
  //   .order("date", { referencedTable: "event_dates", ascending: true });
  // return data ?? [];
  return staticEvents
    .filter((e) => e.locale === locale)
    .sort((a, b) => a.dates[0].date.localeCompare(b.dates[0].date));
}