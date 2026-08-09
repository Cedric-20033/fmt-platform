// lib/actions/gallery.ts
"use server";

import { getGalleryMedia, GALLERY_PAGE_SIZE } from "@/lib/data/gallery";

export async function loadMoreGalleryMedia(page: number) {
  return getGalleryMedia(page, GALLERY_PAGE_SIZE);
}

// Même pagination, scopée à un événement passé précis (gallery_media.related_past_event_id).
export async function loadMorePastEventGalleryMedia(pastEventId: string, page: number) {
  return getGalleryMedia(page, GALLERY_PAGE_SIZE, { relatedPastEventId: pastEventId });
}
