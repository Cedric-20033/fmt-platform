// components/gallery/useGalleryPagination.ts
"use client";

import { useCallback, useState, useTransition } from "react";
import type { GalleryMediaItem } from "@/types/entities";

type GalleryFetcher = (page: number) => Promise<{ items: GalleryMediaItem[]; hasMore: boolean }>;

/**
 * Pagination "scroll infini" générique pour toute galerie de médias
 * (flux terrain global ou galerie scopée à un événement passé). Centralise
 * l'état + le fetch pour que GalleryModal et PastEventModal n'aient plus à
 * dupliquer la même logique.
 */
export function useGalleryPagination(
  initialItems: GalleryMediaItem[],
  initialHasMore: boolean,
  fetcher: GalleryFetcher,
  initialPage = 1
) {
  const [items, setItems] = useState<GalleryMediaItem[]>(initialItems);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [page, setPage] = useState(initialPage);
  const [isPending, startTransition] = useTransition();

  const loadMore = useCallback(() => {
    if (isPending || !hasMore) return;
    startTransition(async () => {
      const { items: nextItems, hasMore: nextHasMore } = await fetcher(page);
      setItems((prev) => [...prev, ...nextItems]);
      setHasMore(nextHasMore);
      setPage((p) => p + 1);
    });
  }, [fetcher, page, isPending, hasMore]);

  return { items, hasMore, isLoadingMore: isPending, loadMore };
}
