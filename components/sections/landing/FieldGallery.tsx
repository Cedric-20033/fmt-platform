// components/sections/landing/FieldGallery.tsx
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/Badge";
import { FieldGalleryClient } from "@/components/gallery/FieldGalleryClient";
import { getGalleryMedia, GALLERY_PREVIEW_COUNT } from "@/lib/data/gallery";

export async function FieldGallerySection() {
  const t = await getTranslations("gallery");
  const { items, hasMore } = await getGalleryMedia(0, GALLERY_PREVIEW_COUNT);

  if (items.length === 0) return null;

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Badge variant="default" className="mb-4">{t("label")}</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{t("title")}</h2>
        </div>

        <FieldGalleryClient previewItems={items} hasMore={hasMore} />
      </div>
    </section>
  );
}