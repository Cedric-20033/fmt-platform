// components/gallery/TabbedMediaGrid.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { GalleryCell } from "@/components/gallery/GalleryCell";
import { MediaLightbox } from "@/components/gallery/MediaLightbox";
import { MediaTabs, type MediaTabValue } from "@/components/gallery/MediaTabs";
import type { DisplayMediaItem } from "@/types/entities";

interface TabbedMediaGridProps {
  items: DisplayMediaItem[];
  /** Pagination "scroll infini" optionnelle (branchée par le parent via useGalleryPagination). */
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;

  photosLabel: string;
  videosLabel: string;
  emptyLabel: string;
  loadingLabel?: string;

  columnsClassName?: string;
  /** "dark" pour les contextes plein écran (lightbox modal, fond noir), "light" sinon. */
  theme?: "light" | "dark";
}

// Composant réutilisé PARTOUT où une galerie de médias s'affiche : galerie
// terrain (preview + modal plein écran), galerie d'un événement annoncé,
// galerie d'un événement passé. Onglets Photo/Vidéo + clic sur une photo =
// diaporama plein écran (yet-another-react-lightbox) + scroll infini optionnel.
export function TabbedMediaGrid({
  items,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
  photosLabel,
  videosLabel,
  emptyLabel,
  loadingLabel = "Chargement…",
  columnsClassName = "columns-2 sm:columns-3 lg:columns-4 gap-3",
  theme = "light",
}: TabbedMediaGridProps) {
  const photos = useMemo(() => items.filter((i) => i.type === "image"), [items]);
  const videos = useMemo(() => items.filter((i) => i.type === "video"), [items]);

  const [activeTab, setActiveTab] = useState<MediaTabValue>(() => (photos.length > 0 ? "photos" : "videos"));
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Si le premier lot chargé n'avait que des vidéos puis des photos arrivent
  // (scroll infini), on ne force pas de bascule : seul le compteur change.
  const activeItems = activeTab === "photos" ? photos : videos;

  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!hasMore || !onLoadMore) return;
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onLoadMore();
      },
      { rootMargin: "600px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, onLoadMore]);

  if (items.length === 0 && !hasMore) {
    return <p className={theme === "dark" ? "text-center text-white/50 text-sm py-16" : "text-center text-gray-400 text-sm py-8"}>{emptyLabel}</p>;
  }

  return (
    <div>
      <MediaTabs
        active={activeTab}
        onChange={setActiveTab}
        photosCount={photos.length}
        videosCount={videos.length}
        photosLabel={photosLabel}
        videosLabel={videosLabel}
        theme={theme}
      />

      {activeItems.length === 0 ? (
        <p className={theme === "dark" ? "text-center text-white/50 text-sm py-16" : "text-center text-gray-400 text-sm py-8"}>{emptyLabel}</p>
      ) : (
        <div className={columnsClassName}>
          {activeItems.map((item) =>
            item.type === "image" ? (
              <GalleryCell
                key={item.id}
                item={item}
                onClick={() => setLightboxIndex(photos.findIndex((p) => p.id === item.id))}
              />
            ) : (
              <GalleryCell key={item.id} item={item} />
            )
          )}
        </div>
      )}

      {hasMore && (
        <div ref={sentinelRef} className="flex justify-center py-10">
          <span className={theme === "dark" ? "text-white/50 text-sm" : "text-gray-400 text-sm"}>
            {isLoadingMore ? loadingLabel : ""}
          </span>
        </div>
      )}

      {lightboxIndex !== null && (
        <MediaLightbox photos={photos} index={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </div>
  );
}
