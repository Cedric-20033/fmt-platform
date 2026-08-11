// components/sections/landing/PastEvents.tsx
import { getTranslations, getLocale } from "next-intl/server";
import { Badge } from "@/components/ui/Badge";
import { PastEventCard } from "@/components/sections/landing/PastEventCard";
import { getPastEvents } from "@/lib/data/past-events";
import type { Locale } from "@/i18n/config";

// Section entièrement séparée de <EventsSection /> : n'affecte jamais les
// événements annoncés (table `events`), lit uniquement `past_events`.
export async function PastEventsSection() {
  const t = await getTranslations("pastEvents");
  const tGallery = await getTranslations("gallery");
  const locale = (await getLocale()) as Locale;
  const pastEvents = await getPastEvents(locale);

  if (pastEvents.length === 0) return null;

  return (
    <section id="past-events" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <Badge variant="default" className="mb-4">
            {t("label")}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{t("title")}</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastEvents.map((pastEvent) => (
            <PastEventCard
              key={pastEvent.id}
              pastEvent={pastEvent}
              viewMoreLabel={t("view_more")}
              galleryTitle={t("gallery_section_title")}
              emptyGalleryLabel={t("gallery_empty")}
              photosLabel={tGallery("tabs.photos")}
              videosLabel={tGallery("tabs.videos")}
              loadingLabel={tGallery("loading")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
