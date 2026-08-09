// components/sections/landing/PastEventModal.tsx
"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { X, MapPin, CalendarDays } from "lucide-react";
import { GalleryCell } from "@/components/gallery/GalleryCell";
import { ShowImage } from "@/components/ui/ShowImage";
import { loadMorePastEventGalleryMedia } from "@/lib/actions/gallery";
import type { GalleryMediaItem, PastEvent } from "@/types/entities";

interface PastEventModalProps {
  pastEvent: PastEvent;
  dateLabel: string;
  galleryTitle: string;
  emptyGalleryLabel: string;
  onClose: () => void;
}

// Vue complète d'un événement passé : infos détaillées en haut, galerie
// photos/vidéos de cet événement en bas avec chargement au scroll (même
// mécanique que GalleryModal, mais scopée à pastEvent.id et intégrée dans
// un seul panneau au lieu d'un lightbox plein écran séparé).
export function PastEventModal({
  pastEvent,
  dateLabel,
  galleryTitle,
  emptyGalleryLabel,
  onClose,
}: PastEventModalProps) {
  const [items, setItems] = useState<GalleryMediaItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isPending, startTransition] = useTransition();
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    if (!hasMore) return;
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isPending) {
          startTransition(async () => {
            const { items: nextItems, hasMore: nextHasMore } = await loadMorePastEventGalleryMedia(
              pastEvent.id,
              page
            );
            setItems((prev) => [...prev, ...nextItems]);
            setHasMore(nextHasMore);
            setPage((p) => p + 1);
          });
        }
      },
      { rootMargin: "600px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, isPending, page, pastEvent.id]);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 overflow-y-auto py-6 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-xl">
        <div className="relative">
          {pastEvent.cover && (
            <div className="relative aspect-[16/9]">
              <ShowImage media={pastEvent.cover} fill sizes="(max-width: 896px) 100vw, 896px" />
            </div>
          )}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{pastEvent.title}</h2>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <CalendarDays size={16} />
              <span className="capitalize">{dateLabel}</span>
            </div>
            {pastEvent.location_name && (
              <div className="flex items-center gap-1.5">
                <MapPin size={16} />
                <span>{pastEvent.location_name}</span>
              </div>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed whitespace-pre-line">{pastEvent.description}</p>
        </div>

        <div className="border-t border-gray-100 p-6 sm:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">{galleryTitle}</h3>

          <div className="columns-2 sm:columns-3 gap-3">
            {items.map((item) => (
              <GalleryCell key={item.id} item={item} />
            ))}
          </div>

          {hasMore && (
            <div ref={sentinelRef} className="flex justify-center py-8">
              <span className="text-gray-400 text-sm">Chargement…</span>
            </div>
          )}

          {!hasMore && items.length === 0 && (
            <p className="text-center text-gray-400 text-sm py-8">{emptyGalleryLabel}</p>
          )}
        </div>
      </div>
    </div>
  );
}
