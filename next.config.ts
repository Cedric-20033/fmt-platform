import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone",

  images: {
    formats: ["image/avif", "image/webp"],
    // Requis uniquement pour components/gallery/GalleryCell.tsx (posters vidéo),
    // seul endroit du projet qui passe une URL Cloudinary brute à next/image.
    // Les autres images passent par CldImage (next-cloudinary), qui a son
    // propre loader et n'a pas besoin de cette config.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
