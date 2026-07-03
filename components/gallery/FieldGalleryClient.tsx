// components/gallery/FieldGalleryClient.tsx
"use client";

import { useState } from "react";
import { GalleryCell } from "@/components/gallery/GalleryCell";
import { GalleryModal } from "@/components/gallery/GalleryModal";
import type { GalleryMediaItem } from "@/types/entities";

export function FieldGalleryClient({
  previewItems,
  hasMore,
}: {
  previewItems: GalleryMediaItem[];
  hasMore: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
        {previewItems.map((item) => (
          <GalleryCell key={item.id} item={item} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="px-6 py-2.5 rounded-full border border-gray-300 text-sm font-semibold text-gray-700 hover:border-[#2b8a8a] hover:text-[#2b8a8a] transition-colors"
          >
            Voir plus
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