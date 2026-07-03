'use client';

// Deferred loader for the /home2 3D WebGL hero. The iframe pulls in ~4MB
// (Three.js bundle + GLB models + textures + audio), so mounting it on first
// paint competes with the parent page's hydration. Instead we render a
// lightweight poster in the scene's own cream background and only mount the
// iframe once the main thread is idle (requestIdleCallback) — or immediately on
// the first user interaction, whichever comes first. When the iframe document
// finishes loading we crossfade the poster out. See public/home2-hero/.
import { useEffect, useRef, useState } from 'react';

export default function Home2Hero() {
  const [mounted, setMounted] = useState(false); // whether the iframe is in the DOM
  const [loaded, setLoaded] = useState(false);   // whether the iframe finished loading
  const firedRef = useRef(false);

  useEffect(() => {
    const start = () => {
      if (firedRef.current) return;
      firedRef.current = true;
      setMounted(true);
    };

    // Prefer idle time so the parent page becomes interactive first; the
    // timeout guarantees the hero still loads promptly on a busy main thread.
    let idleId;
    const usingIdle = typeof window.requestIdleCallback === 'function';
    if (usingIdle) {
      idleId = window.requestIdleCallback(start, { timeout: 2500 });
    } else {
      idleId = window.setTimeout(start, 1200);
    }

    // Any early intent to engage the hero should start it right away.
    const opts = { once: true, passive: true };
    const events = ['pointerdown', 'touchstart', 'wheel', 'keydown'];
    events.forEach((e) => window.addEventListener(e, start, opts));

    return () => {
      if (usingIdle) {
        window.cancelIdleCallback?.(idleId);
      } else {
        clearTimeout(idleId);
      }
      events.forEach((e) => window.removeEventListener(e, start));
    };
  }, []);

  return (
    <section className="relative w-full h-[100svh] bg-[#dfd1bc] overflow-hidden rounded-b-[2rem] md:rounded-b-[3.5rem] mb-10 md:mb-16">
      {mounted && (
        <iframe
          src="/home2-hero/index.html"
          title="3D Hero Animation"
          onLoad={() => setLoaded(true)}
          className={`block h-full w-full border-0 transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          allow="autoplay; fullscreen"
        />
      )}

      {/* Poster shown until the iframe document is ready. Uses the same cream as
          the 3D scene background (matches its <meta theme-color>) so the swap is
          seamless. Sits above the iframe and fades out on load. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 flex items-center justify-center bg-[#dfd1bc] transition-opacity duration-700 ${
          loaded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-black/15 border-t-black/40" />
      </div>
    </section>
  );
}
