"use client";

interface NSGlobeProps {
  /** Tailwind opacity class, e.g. "opacity-10" or "opacity-20". Defaults to "opacity-10". */
  opacity?: string;
  /** Width/height of the globe in px. Defaults to 500. */
  size?: number;
  /** Extra className to apply to the outer wrapper (for positioning). */
  className?: string;
}

export function NSGlobe({ opacity = "opacity-10", size = 500, className = "" }: NSGlobeProps) {
  return (
    <>
      <div
        className={`pointer-events-none ${opacity} ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="w-full h-full rounded-full relative overflow-hidden shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.1)]">
          {/* Rolling Map Texture */}
          <div
            className="absolute inset-0 bg-[url('/world-map.webp')] bg-cover opacity-80 animate-spin-globe"
            style={{ backgroundSize: "200% 100%" }}
          />
          {/* Shadow Overlay for 3D effect */}
          <div className="absolute inset-0 rounded-full shadow-[inset_10px_10px_50px_rgba(0,0,0,0.1)] mix-blend-multiply" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin-globe {
          0% { background-position: 0 0; }
          100% { background-position: 200% 0; }
        }
        .animate-spin-globe {
          animation: spin-globe 20s linear infinite;
          will-change: background-position;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-spin-globe { animation: none; }
        }
      `}</style>
    </>
  );
}
