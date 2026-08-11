// components/gallery/GalleryCell.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import { ShowImage } from "@/components/ui/ShowImage";
import { resolveVideoPosterUrl, resolveVideoUrl } from "@/lib/utils/media";
import type { DisplayMediaItem } from "@/types/entities";

interface GalleryCellProps {
  item: DisplayMediaItem;
  /** Ouvre la lightbox diaporama (ignoré pour les vidéos, qui se lisent en place). */
  onClick?: () => void;
}

export function GalleryCell({ item, onClick }: GalleryCellProps) {
  const [playing, setPlaying] = useState(false);
  const ratio = item.width && item.height ? `${item.width} / ${item.height}` : "4 / 3";

  if (item.type === "image") {
    return (
      <button
        type="button"
        onClick={onClick}
        className="mb-3 block w-full break-inside-avoid rounded-lg overflow-hidden text-left cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b8a8a]"
        aria-label={item.alt || "Agrandir la photo"}
      >
        <ShowImage
          media={{ ...item, is_cover: false, order: 0, caption: null }}
          aspectRatio={ratio}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
      </button>
    );
  }

  // Vidéo : poster figé tant qu'on n'a pas cliqué, lecture réelle ensuite avec
  // une URL correctement résolue (storage_ref seul n'est JAMAIS une URL jouable).
  return (
    <div className="mb-3 break-inside-avoid rounded-lg overflow-hidden relative" style={{ aspectRatio: ratio }}>
      {playing ? (
        item.provider === "cloudinary" ? (
          <CldVideoPlayer
            src={item.storage_ref}
            width={item.width ?? 1280}
            height={item.height ?? 720}
            autoPlay
            config={{ cloud: { cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME } }}
          />
        ) : (
          <video
            src={resolveVideoUrl(item)}
            controls
            autoPlay
            className="w-full h-full object-cover"
          />
        )
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
