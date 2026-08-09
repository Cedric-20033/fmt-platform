// components/gallery/GalleryModal.tsx
"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { X } from "lucide-react";
import { GalleryCell } from "@/components/gallery/GalleryCell";
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
  const [items, setItems] = useState(initialItems);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [page, setPage] = useState(initialPage); // la page 0 est déjà chargée (initialItems) si initialPage=1
  const [isPending, startTransition] = useTransition();
  const sentinelRef = useRef<HTMLDivElement>(null);

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

  // Charge la suite quand le repère en bas devient visible
  useEffect(() => {
    if (!hasMore) return;
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isPending) {
          startTransition(async () => {
            const { items: nextItems, hasMore: nextHasMore } = pastEventId
              ? await loadMorePastEventGalleryMedia(pastEventId, page)
              : await loadMoreGalleryMedia(page);
            setItems((prev) => [...prev, ...nextItems]);
            setHasMore(nextHasMore);
            setPage((p) => p + 1);
          });
        }
      },
      { rootMargin: "600px" } // anticipe le chargement avant d'atteindre le bas
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, isPending, page]);

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
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
          {items.map((item) => (
            <GalleryCell key={item.id} item={item} />
          ))}
        </div>

        {hasMore && (
          <div ref={sentinelRef} className="flex justify-center py-10">
            <span className="text-white/50 text-sm">Chargement…</span>
          </div>
        )}

        {!hasMore && items.length === 0 && (
          <p className="text-center text-white/50 text-sm py-16">
            Aucune photo ou vidéo pour le moment.
          </p>
        )}
      </div>
    </div>
  );
}