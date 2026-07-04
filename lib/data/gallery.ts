// lib/data/gallery.ts

import { createClient } from "@/lib/supabase/server";
import type { GalleryMediaItem } from "@/types/entities";

export const GALLERY_PREVIEW_COUNT = 12;
export const GALLERY_PAGE_SIZE = 24;

export async function getGalleryMedia(
  page = 0,
  pageSize = GALLERY_PAGE_SIZE
): Promise<{ items: GalleryMediaItem[]; hasMore: boolean }> {
  const supabase = await createClient();
  const from = page * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("gallery_media")
    .select("id, type, provider, storage_ref, alt, caption, width, height, duration_seconds, created_at", {
      count: "exact",
    })
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("getGalleryMedia error:", error.message);
    return { items: [], hasMore: false };
  }

  const items: GalleryMediaItem[] = (data ?? []).map((row) => ({
    id: row.id,
    type: row.type,
    provider: row.provider,
    storage_ref: row.storage_ref,
    alt: row.alt ?? "",
    caption: row.caption,
    width: row.width,
    height: row.height,
    duration_seconds: row.duration_seconds,
    created_at: row.created_at,
  }));

  const hasMore = count !== null ? to + 1 < count : items.length === pageSize;
  return { items, hasMore };
}