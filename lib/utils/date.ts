// lib/utils/date.ts
import type { EventDateSlot } from "@/types/entities";

export function formatEventDateRange(
  dates: EventDateSlot[],
  locale: string
): { dayLabel: string; timeLabel: string } {
  const first = dates[0];
  const formatter = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  if (dates.length === 1) {
    return {
      dayLabel: formatter.format(new Date(first.date)),
      timeLabel: `${first.start_time} – ${first.end_time}`,
    };
  }

  const last = dates[dates.length - 1];
  return {
    dayLabel: `${formatter.format(new Date(first.date))} – ${formatter.format(new Date(last.date))}`,
    timeLabel: dates.map((d) => `${d.label ?? ""} ${d.start_time}–${d.end_time}`).join(" · "),
  };
}