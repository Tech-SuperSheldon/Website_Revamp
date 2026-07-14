/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@heroicons/react",
      "react-icons",
    ],
  },
  async headers() {
    // The /home2 3D hero (Vite build in public/home2-hero) emits
    // content-hashed chunks/assets plus stable fonts and the Draco decoder.
    // Cache them forever so repeat visits and internal navigations don't
    // re-download ~3.5MB. The entry index.html is intentionally left to the
    // default (revalidating) policy so rebuilds are picked up immediately.
    const immutable = [
      { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
    ];

    // Static media (images/video/fonts) rarely change. Cache for 30 days and
    // serve stale-while-revalidate so repeat visits and page-to-page
    // navigations don't re-download them — the single biggest perceived-speed
    // win after shrinking the files themselves.
    const longCache = [
      { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=604800" },
    ];
    const assetFolders = [
      "teachers", "newsite", "images", "icons", "reviews", "videos", "avatars",
      "naplan", "UK", "course", "become-teacher", "eleven", "brochures",
      "bhanzu-webinar", "waste",
    ];

    return [
      ...["chunks", "assets", "fonts", "draco"].map((folder) => ({
        source: `/home2-hero/${folder}/:path*`,
        headers: immutable,
      })),
      ...assetFolders.map((folder) => ({
        source: `/${folder}/:path*`,
        headers: longCache,
      })),
      // Any media file anywhere (also covers loose files in /public root such
      // as studentvid.mp4 and phoneinhand.png).
      {
        source: "/(.*)\\.(png|jpg|jpeg|webp|avif|gif|svg|ico|mp4|webm|mov|woff|woff2|ttf|otf)",
        headers: longCache,
      },
    ];
  },
};

export default nextConfig;
