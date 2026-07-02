import { ShowImage } from "@/components/ui/ShowImage";
import { getTranslations, getLocale } from "next-intl/server";
import {
  CalendarDays,
  Clock,
  MapPin,
  Mail,
  Phone,
  Users,
  Ticket,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { getEvents } from "@/lib/data/event";
import { formatEventDateRange } from "@/lib/utils/date";
import type { Locale } from "@/i18n/config";
import type { Event } from "@/types/entities";

function EventCard({ event, locale }: { event: Event; locale: string }) {
  const { dayLabel, timeLabel } = formatEventDateRange(event.dates, locale);
  const cover = event.media.find((m) => m.is_cover) ?? event.media[0];
  //const gallery = event.media.filter((m) => !m.is_cover);

  return (
    <Card className="overflow-hidden border-none shadow-sm ring-1 ring-black/5">
      <CardContent className="p-0">
        <div className="grid lg:grid-cols-[340px_1fr]">
          {/* Colonne visuelle + infos pratiques */}
          <div className="relative bg-[#0f2a2a]">
            {cover && (
              <div className="relative aspect-[3/4] lg:aspect-auto lg:h-full min-h-[320px]">
                <ShowImage
                  src={cover.url}
                  alt={cover.alt}
                  fill
                  className="object-cover"
                  
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a2a] via-[#0f2a2a]/10 to-transparent" />
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-3">
              {event.is_free && (
                <Badge className="bg-[#f39237] text-white border-none mb-1">
                  <Ticket size={12} className="mr-1" />
                  Entrée libre
                </Badge>
              )}
              <div className="flex items-start gap-2 text-sm">
                <CalendarDays
                  size={16}
                  className="mt-0.5 shrink-0 text-[#6fd6d6]"
                />
                <span className="capitalize">{dayLabel}</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Clock size={16} className="mt-0.5 shrink-0 text-[#6fd6d6]" />
                <span>{timeLabel}</span>
              </div>
              {event.location_name && (
                <div className="flex items-start gap-2 text-sm">
                  <MapPin
                    size={16}
                    className="mt-0.5 shrink-0 text-[#6fd6d6]"
                  />
                  <span>
                    {event.location_name}
                    {event.location_address && (
                      <span className="block text-white/70 text-xs mt-0.5">
                        {event.location_address}
                      </span>
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Colonne contenu */}
          <div className="p-6 sm:p-8 lg:p-10 space-y-8">
            <div>
              {event.theme && (
                <p className="text-[#2b8a8a] font-semibold text-sm tracking-wide uppercase mb-2">
                  {event.theme}
                </p>
              )}
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                {event.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Programme — timeline */}
            {event.schedule.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                  Programme
                </h4>
                <ol className="relative border-l-2 border-[#f39237]/30 space-y-6 pl-6">
                  {event.schedule
                    .sort((a, b) => a.order - b.order)
                    .map((item) => (
                      <li key={item.id} className="relative">
                        <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#f39237] ring-4 ring-white" />
                        <p className="text-xs font-bold text-[#f39237] uppercase tracking-wide mb-1">
                          {item.part_label} · {item.time_range}
                        </p>
                        <p className="font-semibold text-gray-900">
                          {item.title}
                        </p>
                        {item.description && (
                          <p className="text-sm text-gray-500 mt-0.5">
                            {item.description}
                          </p>
                        )}
                      </li>
                    ))}
                </ol>
              </div>
            )}

            {/* Visuel secondaire (affiche programme) }
            {gallery.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {gallery.map((item) => (
                  <div
                    key={item.id}
                    className="relative aspect-[3/4] rounded-lg overflow-hidden ring-1 ring-black/5"
                  >
                    <ShowImage
                      src={item.url}
                      alt={item.alt}
                      fill
                      
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )*/}

            {/* Partenaires + contacts */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-6 border-t border-gray-100">
              {event.partners.length > 0 && (
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    <Users size={12} />
                    En partenariat avec
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {event.partners.map((p) => (
                      <Badge
                        key={p.name}
                        variant="outline"
                        className="font-normal"
                      >
                        {p.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {event.contacts.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  {event.contacts.map((c) => (
                    <a
                      key={c.value}
                      href={
                        c.type === "email"
                          ? `mailto:${c.value}`
                          : `tel:${c.value.replace(/\s/g, "")}`
                      }
                      className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#2b8a8a] transition-colors"
                    >
                      {c.type === "email" ? (
                        <Mail size={14} />
                      ) : (
                        <Phone size={14} />
                      )}
                      {c.value}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export async function EventsSection() {
  const t = await getTranslations("events");
  const locale = (await getLocale()) as Locale;
  const events = await getEvents(locale);

  if (events.length === 0) return null;

  return (
    <section id="events" className="py-24 bg-[#f9f7f5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <Badge variant="default" className="mb-4">
            {t("label")}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {t("title")}
          </h2>
        </div>

        <div className="flex flex-col gap-10">
          {events.map((event) => (
            <EventCard key={event.id} event={event} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
