// components/ui/MediaGallery.tsx
import type { MediaAsset } from "@/types/entities";
import { ShowImage } from "@/components/ui/ShowImage";

export function MediaGallery({ media }: { media: MediaAsset[] }) {
  if (media.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
      {media.map((item) => (
        <div key={item.id} className={item.type === "video" ? "col-span-2" : undefined}>
          <ShowImage
            media={item}
            aspectRatio={item.type === "video" ? "16 / 9" : "3 / 4"}
            className="rounded-lg"
            sizes="(max-width: 640px) 50vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
}