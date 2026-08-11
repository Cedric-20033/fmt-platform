// components/gallery/GalleryModal.tsx
"use client";

import { useEffect, useMemo } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { TabbedMediaGrid } from "@/components/gallery/TabbedMediaGrid";
import { useGalleryPagination } from "@/components/gallery/useGalleryPagination";
import { loadMoreGalleryMedia, loadMorePastEventGalleryMedia } from "@/lib/actions/gallery";
import type { GalleryMediaItem } from "@/types/entities";

export function GalleryModal({
  initialItems,
  initialHasMore,
  onClose,
  pastEventId,
  initialPage = 1, // la page 0 est déjà chargée (initialItems) — 0 si on ouvre sans préchargement
}: {
  initialItems: GalleryMediaItem[];
  initialHasMore: boolean;
  onClose: () => void;
  pastEventId?: string; // si fourni, la galerie est scopée à cet événement passé (au lieu du flux terrain global)
  initialPage?: number;
}) {
  const t = useTranslations("gallery");

  const fetcher = useMemo(
    () => (page: number) => (pastEventId ? loadMorePastEventGalleryMedia(pastEventId, page) : loadMoreGalleryMedia(page)),
    [pastEventId]
  );
  const { items, hasMore, isLoadingMore, loadMore } = useGalleryPagination(
    initialItems,
    initialHasMore,
    fetcher,
    initialPage
  );

  // Bloque le scroll de la page derrière la modal
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Ferme sur Échap
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 overflow-y-auto">
      <div className="sticky top-0 z-10 flex justify-end p-4 bg-gradient-to-b from-black/80 to-transparent">
        <button
          type="button"
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <TabbedMediaGrid
          items={items}
          hasMore={hasMore}
          isLoadingMore={isLoadingMore}
          onLoadMore={loadMore}
          photosLabel={t("tabs.photos")}
          videosLabel={t("tabs.videos")}
          emptyLabel={t("empty")}
          loadingLabel={t("loading")}
          theme="dark"
        />
      </div>
    </div>
  );
}
