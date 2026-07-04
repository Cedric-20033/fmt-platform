// components/ui/CloudinaryMedia.tsx
"use client";

import { CldImage, CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import type { MediaAsset } from "@/types/entities";

interface CloudinaryMediaProps {
  media: MediaAsset;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

export function CloudinaryMedia({ media, sizes, priority, className }: CloudinaryMediaProps) {
  if (media.type === "video") {
    return (
      <CldVideoPlayer
        src={media.storage_ref}
        width={media.width ?? 1280}
        height={media.height ?? 720}
      />
    );
  }

  return (
    <CldImage
      src={media.storage_ref}
      alt={media.alt}
      fill
      crop="fill"
      gravity="auto"
      format="auto"
      quality="auto"
      sizes={sizes ?? "(max-width: 768px) 50vw, 33vw"}
      priority={priority}
      className={className ?? "object-cover"}
    />
  );
}