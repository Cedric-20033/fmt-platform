// components/gallery/MediaLightbox.tsx
"use client";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { resolveMediaUrl } from "@/lib/utils/media";
import type { DisplayMediaItem } from "@/types/entities";

interface MediaLightboxProps {
  /** Uniquement des photos — les vidéos se lisent en place dans la grille. */
  photos: DisplayMediaItem[];
  index: number;
  onClose: () => void;
}

// Diaporama plein écran, réutilisé partout où une photo est cliquée
// (galerie terrain, galerie d'un événement, galerie d'un événement passé).
// Swipe/zoom/clavier/miniatures gérés par la librairie — pas de logique
// custom à maintenir ici.
export function MediaLightbox({ photos, index, onClose }: MediaLightboxProps) {
  const slides = photos.map((photo) => ({
    src: resolveMediaUrl(photo, { width: 1920 }),
    alt: photo.alt,
    width: photo.width ?? undefined,
    height: photo.height ?? undefined,
  }));

  return (
    <Lightbox
      open
      close={onClose}
      index={index}
      slides={slides}
      plugins={[Zoom, Counter, Thumbnails]}
      carousel={{ finite: false }}
      animation={{ swipe: 250 }}
      thumbnails={{ position: "bottom", border: 0, borderRadius: 8, gap: 8, imageFit: "cover" }}
      zoom={{ maxZoomPixelRatio: 3, doubleTapDelay: 250 }}
      styles={{ container: { backgroundColor: "rgba(15, 42, 42, 0.97)" } }}
    />
  );
}
