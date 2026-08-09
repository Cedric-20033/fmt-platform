// lib/data/media.ts
import { createClient } from "@/lib/supabase/server";
import type { MediaAsset } from "@/types/entities";

interface RawMediaRow {
  id: string;
  type: "image" | "video";
  provider: MediaAsset["provider"];
  storage_ref: string;
  alt: string | null;
  caption: string | null;
  is_cover: boolean;
  order: number;
  width: number | null;
  height: number | null;
  duration_seconds: number | null;
  owner_id: string;
}

export async function getMediaForOwners(
  ownerType: "event" | "news" | "project" | "gallery_album" | "profile" | "past_event",
  ownerIds: string[]
): Promise<Map<string, MediaAsset[]>> {
  const map = new Map<string, MediaAsset[]>();
  if (ownerIds.length === 0) return map;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("media")
    .select("id, type, provider, storage_ref, alt, caption, is_cover, order, width, height, duration_seconds, owner_id")
    .eq("owner_type", ownerType)
    .in("owner_id", ownerIds)
    .order("order", { ascending: true });

  if (error) {
    console.error("getMediaForOwners error:", error.message);
    return map;
  }

  for (const row of data as RawMediaRow[]) {
    const list = map.get(row.owner_id) ?? [];
    list.push({
      id: row.id,
      type: row.type,
      provider: row.provider,
      storage_ref: row.storage_ref,
      alt: row.alt ?? "",
      caption: row.caption,
      is_cover: row.is_cover,
      order: row.order,
      width: row.width,
      height: row.height,
      duration_seconds: row.duration_seconds,
    });
    map.set(row.owner_id, list);
  }

  return map;
}