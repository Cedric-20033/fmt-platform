// components/ui/MediaGallery.tsx
import Image from "next/image";
import type { MediaAsset } from "@/types/entities";

export function MediaGallery({ media }: { media: MediaAsset[] }) {
  if (media.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
      {media.map((item) =>
        item.type === "image" ? (
          <div key={item.id} className="relative aspect-[3/4] rounded-lg overflow-hidden">
            <Image
              src={item.url}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div key={item.id} className="relative aspect-video rounded-lg overflow-hidden col-span-2">
            <iframe
              src={item.url}
              title={item.alt}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        )
      )}
    </div>
  );
}