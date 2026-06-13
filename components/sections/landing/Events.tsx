import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

const EVENTS = ["event_1", "event_2", "event_3"] as const;

export function EventsSection() {
  const t = useTranslations("events");
  const locale = useLocale();

  return (
    <section id="events" className="py-24 bg-[#f9f7f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <Badge variant="default" className="mb-4">{t("label")}</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{t("title")}</h2>
          </div>
          <Button asChild variant="outline" size="sm" disabled>
            <Link href={`/${locale}/events`}>
              {t("view_all")} <ArrowRight size={16} />
            </Link>
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          {EVENTS.map((key, i) => (
            <Card
              key={key}
              className="hover:shadow-md transition-shadow duration-300"
            >
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row items-stretch">
                  {/* Barre d'accentuation de la date */}
                  <div
                    className="sm:w-2 w-full h-2 sm:h-auto rounded-t-xl sm:rounded-t-none sm:rounded-l-xl shrink-0"
                    style={{ background: i % 2 === 0 ? "#2b8a8a" : "#f39237" }}
                  />
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 flex-1">
                    {/* Date */}
                    <div className="shrink-0 text-center sm:min-w-[100px]">
                      <p className="text-[#2b8a8a] font-bold text-sm">
                        {t(`${key}_date` as const)}
                      </p>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {t(`${key}_title` as const)}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-2">
                        {t(`${key}_desc` as const)}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <MapPin size={12} />
                        <span>{t(`${key}_location` as const)}</span>
                      </div>
                    </div>

                    <Button size="sm" variant={i % 2 === 0 ? "default" : "accent"} className="shrink-0" disabled>
                      <CalendarDays size={14} />
                      {t("register")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
