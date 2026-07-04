// lib/utils/media.ts
import type { MediaAsset } from "@/types/entities";
import type {GalleryMediaItem} from "@/types/entities";

interface ResolveOptions {
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "thumb";
}

/**
 * Construit une URL affichable à partir d'un MediaAsset, quel que soit
 * le prestataire. Utilisé pour les cas où on ne passe PAS par un composant
 * dédié (next-cloudinary gère Cloudinary directement — voir AdaptiveMedia).
 * Utile par exemple pour des <img> hors React, des flux RSS, l'OG image...
 */
export function resolveMediaUrl(asset: Pick<MediaAsset, "provider" | "storage_ref">, options: ResolveOptions = {}): string {
  switch (asset.provider) {
    case "cloudinary": {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const t = ["f_auto", "q_auto"];
      if (options.width) t.push(`w_${options.width}`);
      if (options.height) t.push(`h_${options.height}`);
      if (options.crop) t.push(`c_${options.crop}`);
      return `https://res.cloudinary.com/${cloudName}/image/upload/${t.join(",")}/${asset.storage_ref}`;
    }
    case "s3": {
      const baseUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;
      return `${baseUrl}/${asset.storage_ref}`;
    }
    default:
      return asset.storage_ref;
  }
}

// à ajouter dans lib/utils/media.ts
export function resolveVideoPosterUrl(asset: Pick<GalleryMediaItem, "provider" | "storage_ref">, width = 480): string {
  if (asset.provider === "cloudinary") {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    return `https://res.cloudinary.com/${cloudName}/video/upload/so_0,f_jpg,q_auto,w_${width}/${asset.storage_ref}.jpg`;
  }
  return "";
}