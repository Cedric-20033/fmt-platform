// components/ui/ShowImage.tsx
import Image from "next/image";
import { CldImage, CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import { resolveMediaUrl } from "@/lib/utils/media";
import type { MediaAsset } from "@/types/entities";

interface ShowImageProps {
  // --- Mode "legacy" : chemin brut (logo, image locale statique) ---
  src?: string;
  width?: number;
  height?: number;
  size?: number;

  // --- Mode "media" : MediaAsset (Cloudinary ou futur prestataire) ---
  media?: MediaAsset;
  aspectRatio?: string; // ex: "16 / 9" — sinon dérivé de media.width/height
  sizes?: string;
  priority?: boolean;

  // --- Commun aux deux modes ---
  fill?: boolean; // true = le parent gère déjà position:relative + dimensions
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
}: ShowImageProps) {
  // ===================== MODE MEDIA =====================
  if (media) {
    const resolvedAlt = alt || media.alt;

    if (media.type === "video") {
      const videoEl =
        media.provider === "cloudinary" ? (
          <CldVideoPlayer src={media.storage_ref} width={media.width ?? 1280} height={media.height ?? 720} />
        ) : (
          <video src={resolveMediaUrl(media)} controls className="w-full h-full object-cover" />
        );

      if (fill) return <div className={`absolute inset-0 ${className}`}>{videoEl}</div>;

      const ratio = aspectRatio ?? (media.width && media.height ? `${media.width} / ${media.height}` : "16 / 9");
      return (
        <div className={`relative w-full ${className}`} style={{ aspectRatio: ratio }}>
          {videoEl}
        </div>
      );
    }

    // Image
    const imageEl =
      media.provider === "cloudinary" ? (
        <CldImage
          src={media.storage_ref}
          alt={resolvedAlt}
          fill
          crop="fill"
          gravity="auto"
          format="auto"
          quality="auto"
          sizes={sizes ?? "(max-width: 768px) 50vw, 33vw"}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <Image
          src={resolveMediaUrl(media)}
          alt={resolvedAlt}
          fill
          sizes={sizes ?? "(max-width: 768px) 50vw, 33vw"}
          className="object-cover"
          priority={priority}
        />
      );

    if (fill) return <>{imageEl}</>;

    const ratio = aspectRatio ?? (media.width && media.height ? `${media.width} / ${media.height}` : "4 / 3");
    return (
      <div className={`relative w-full overflow-hidden ${className}`} style={{ aspectRatio: ratio }}>
        {imageEl}
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
    <Image
      src={src ?? "/Images/logo.png"}
      width={imageWidth}
      height={imageHeight}
      alt={alt || "Image"}
      className={className}
    />
  );
}