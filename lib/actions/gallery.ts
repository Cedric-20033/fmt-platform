// lib/actions/gallery.ts
"use server";

import { getGalleryMedia, GALLERY_PAGE_SIZE } from "@/lib/data/gallery";

export async function loadMoreGalleryMedia(page: number) {
  return getGalleryMedia(page, GALLERY_PAGE_SIZE);
}