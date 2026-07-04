// components/gallery/GalleryCell.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { ShowImage } from "@/components/ui/ShowImage";
import { resolveVideoPosterUrl } from "@/lib/utils/media";
import type { GalleryMediaItem } from "@/types/entities";

export function GalleryCell({ item }: { item: GalleryMediaItem }) {
  const [playing, setPlaying] = useState(false);
  const ratio = item.width && item.height ? `${item.width} / ${item.height}` : "4 / 3";

  if (item.type === "image") {
    return (
      <div className="mb-3 break-inside-avoid rounded-lg overflow-hidden">
        <ShowImage
          media={{ ...item, is_cover: false, order: 0 }}
          aspectRatio={ratio}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
      </div>
    );
  }

  // Vidéo : poster figé tant qu'on n'a pas cliqué, lecture réelle seulement ensuite
  return (
    <div className="mb-3 break-inside-avoid rounded-lg overflow-hidden relative" style={{ aspectRatio: ratio }}>
      {playing ? (
        <video src={item.storage_ref} controls autoPlay className="w-full h-full object-cover" />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="absolute inset-0 group cursor-pointer"
          aria-label="Lire la vidéo"
        >
          <div className="relative w-full h-full">
            <Image
              src={resolveVideoPosterUrl(item, 480)}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
          <span className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
            <span className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
              <Play size={20} className="text-[#0f2a2a] ml-0.5" fill="currentColor" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}