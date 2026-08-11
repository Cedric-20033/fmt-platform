// components/ui/ShowImage.tsx
import Image from "next/image";
import { CloudinaryMedia } from "@/components/ui/CloudinaryMedia";
import { resolveMediaUrl } from "@/lib/utils/media";
import type { MediaAsset } from "@/types/entities";

interface ShowImageProps {
  //=== LEGACY MODE (inchangé) ===
  src?: string;
  width?: number;
  height?: number;
  size?: number;

  //=== NOUVEAU MODE MEDIA ===
  media?: MediaAsset;
  aspectRatio?: string;
  sizes?: string;
  priority?: boolean;
  /** "cover" (défaut) recadre pour remplir ; "contain" n'affiche jamais l'image rognée (affiches, programmes). */
  fit?: "cover" | "contain";

  //=== OPTIONS pour les deux modes ===

  fill?: boolean;
  alt?: string;
  className?: string;
}

export function ShowImage({
  src,
  width,
  height,
  size,
  media,
  aspectRatio,
  sizes,
  priority,
  fill = false,
  alt = "",
  className = "",
  fit = "cover",
}: ShowImageProps) {
  // ===================== MODE MEDIA =====================
  if (media) {
    const resolvedAlt = alt || media.alt;
    const mediaWithAlt = { ...media, alt: resolvedAlt };

    if (media.provider === "cloudinary") {
      if (fill) {
        return <CloudinaryMedia media={mediaWithAlt} sizes={sizes} priority={priority} className={className} fit={fit} />;
      }
      const ratio =
        aspectRatio ??
        (media.width && media.height ? `${media.width} / ${media.height}` : media.type === "video" ? "16 / 9" : "4 / 3");
      return (
        <div className={`relative w-full overflow-hidden ${className}`} style={{ aspectRatio: ratio }}>
          <CloudinaryMedia media={mediaWithAlt} sizes={sizes} priority={priority} fit={fit} />
        </div>
      );
    }

    // Prestataire non-Cloudinary : next/image classique, pas de frontière client nécessaire
    const objectFitClass = fit === "contain" ? "object-contain" : "object-cover";
    if (fill) {
      return (
        <Image
          src={resolveMediaUrl(media)}
          alt={resolvedAlt}
          fill
          sizes={sizes ?? "100%"}
          className={className || objectFitClass}
          priority={priority}
        />
      );
    }
    const ratio = aspectRatio ?? "4 / 3";
    return (
      <div className={`relative w-full overflow-hidden ${className}`} style={{ aspectRatio: ratio }}>
        <Image src={resolveMediaUrl(media)} alt={resolvedAlt} fill sizes={sizes ?? "100%"} className={objectFitClass} priority={priority} />
      </div>
    );
  }

  // ===================== MODE LEGACY (inchangé) =====================
  const imageWidth = size ?? width ?? 260;
  const imageHeight = size ?? height ?? 260;

  if (fill) {
    return <Image src={src ?? "/Images/logo.png"} alt={alt || "Image"} fill className={className} sizes="100%" />;
  }

  return (
    <Image src={src ?? "/Images/logo.png"} width={imageWidth} height={imageHeight} alt={alt || "Image"} className={className} />
  );
}