// components/gallery/FieldGalleryClient.tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { TabbedMediaGrid } from "@/components/gallery/TabbedMediaGrid";
import { GalleryModal } from "@/components/gallery/GalleryModal";
import type { GalleryMediaItem } from "@/types/entities";

export function FieldGalleryClient({
  previewItems,
  hasMore,
}: {
  previewItems: GalleryMediaItem[];
  hasMore: boolean;
}) {
  const t = useTranslations("gallery");
  const [open, setOpen] = useState(false);

  return (
    <>
      <TabbedMediaGrid
        items={previewItems}
        photosLabel={t("tabs.photos")}
        videosLabel={t("tabs.videos")}
        emptyLabel={t("empty")}
      />

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="px-6 py-2.5 rounded-full border border-gray-300 text-sm font-semibold text-gray-700 hover:border-[#2b8a8a] hover:text-[#2b8a8a] transition-colors"
          >
            {t("view_more")}
          </button>
        </div>
      )}

      {open && (
        <GalleryModal
          initialItems={previewItems}
          initialHasMore={hasMore}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
