// components/ui/MediaGallery.tsx
import { getTranslations } from "next-intl/server";
import { TabbedMediaGrid } from "@/components/gallery/TabbedMediaGrid";
import type { MediaAsset } from "@/types/entities";

export async function MediaGallery({ media }: { media: MediaAsset[] }) {
  if (media.length === 0) return null;

  const t = await getTranslations("gallery");

  return (
    <TabbedMediaGrid
      items={media}
      photosLabel={t("tabs.photos")}
      videosLabel={t("tabs.videos")}
      emptyLabel={t("empty")}
      columnsClassName="columns-2 sm:columns-3 gap-3"
    />
  );
}
