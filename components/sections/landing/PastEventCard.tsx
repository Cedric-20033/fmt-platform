// components/sections/landing/PastEventCard.tsx
"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { ShowImage } from "@/components/ui/ShowImage";
import { PastEventModal } from "@/components/sections/landing/PastEventModal";
import { formatSimpleDate } from "@/lib/utils/date";
import type { PastEvent } from "@/types/entities";

interface PastEventCardProps {
  pastEvent: PastEvent;
  viewMoreLabel: string;
  galleryTitle: string;
  emptyGalleryLabel: string;
  photosLabel: string;
  videosLabel: string;
  loadingLabel: string;
}

export function PastEventCard({
  pastEvent,
  viewMoreLabel,
  galleryTitle,
  emptyGalleryLabel,
  photosLabel,
  videosLabel,
  loadingLabel,
}: PastEventCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const dateLabel = formatSimpleDate(pastEvent.occurred_on, pastEvent.locale);

  return (
    <>
      <Card className="overflow-hidden flex flex-col h-full">
        {/* Photo de couverture uniquement */}
        {pastEvent.cover && (
          <div className="relative aspect-[16/10] shrink-0 bg-[#0f2a2a]">
            <ShowImage media={pastEvent.cover} fill fit="contain" sizes="(max-width: 1024px) 100vw, 400px" />
          </div>
        )}

        {/* Titre en gras + 3 lignes de description max */}
        <CardContent className="p-6 flex-1 space-y-2">
          <h3 className="text-xl font-bold text-gray-900">{pastEvent.title}</h3>
          <p className="text-gray-600 leading-relaxed text-sm line-clamp-3">{pastEvent.description}</p>
        </CardContent>

        {/* Pied de page : "Voir plus" → ouvre la vue complète */}
        <CardFooter>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#0f2a2a] text-white px-6 py-2.5 text-sm font-semibold hover:bg-[#0f2a2a]/90 transition-colors"
          >
            {viewMoreLabel}
            <ArrowRight size={16} />
          </button>
        </CardFooter>
      </Card>

      {modalOpen && (
        <PastEventModal
          pastEvent={pastEvent}
          dateLabel={dateLabel}
          galleryTitle={galleryTitle}
          emptyGalleryLabel={emptyGalleryLabel}
          photosLabel={photosLabel}
          videosLabel={videosLabel}
          loadingLabel={loadingLabel}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
