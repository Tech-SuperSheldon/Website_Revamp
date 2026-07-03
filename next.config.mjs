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
    return ["chunks", "assets", "fonts", "draco"].map((folder) => ({
      source: `/home2-hero/${folder}/:path*`,
      headers: immutable,
    }));
  },
};

export default nextConfig;
