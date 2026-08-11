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
  /**
   * "cover" (défaut) : recadre pour remplir le conteneur — adapté aux photos
   * décoratives où un léger rognage n'a pas d'importance.
   * "contain" : n'affiche jamais l'image rognée — obligatoire pour les
   * affiches/programmes où le contenu textuel doit rester entier, quel que
   * soit l'écran. L'espace résiduel laisse voir le fond du conteneur parent
   * (prévoir un fond non-blanc sur ce parent).
   */
  fit?: "cover" | "contain";
}

export function CloudinaryMedia({ media, sizes, priority, className, fit = "cover" }: CloudinaryMediaProps) {
  if (media.type === "video") {
    return (
      <CldVideoPlayer
        src={media.storage_ref}
        width={media.width ?? 1280}
        height={media.height ?? 720}
        config={{ cloud: { cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME } }}
      />
    );
  }

  return (
    <CldImage
      src={media.storage_ref}
      alt={media.alt}
      fill
      crop={fit === "contain" ? "fit" : "fill"}
      gravity="auto"
      format="auto"
      quality="auto"
      sizes={sizes ?? "(max-width: 768px) 50vw, 33vw"}
      priority={priority}
      className={className || (fit === "contain" ? "object-contain" : "object-cover")}
    />
  );
}