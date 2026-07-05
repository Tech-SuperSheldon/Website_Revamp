'use client';

// Deferred loader for the /home2 3D WebGL hero. The iframe pulls in ~3MB
// (Three.js bundle + GLB models + textures; audio is stripped from the embed
// build — see idea_website/portfolio-2025 VITE_SOUNDS), so mounting it on first
// paint competes with the parent page's hydration. Instead we render a
// lightweight poster in the scene's own cream background and only mount the
// iframe once the main thread is idle (requestIdleCallback) — or immediately on
// the first user interaction, whichever comes first. When the iframe document
// finishes loading we crossfade the poster out. See public/home2-hero/.
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home2Hero() {
  const [mounted, setMounted] = useState(false); // whether the iframe is in the DOM
  const [loaded, setLoaded] = useState(false);   // whether the iframe finished loading
  const firedRef = useRef(false);
  const router = useRouter();

  // The hero's phone CTA is injected inside the same-origin iframe (see
  // public/home2-hero/index.html). On a valid submit it postMessages us so we can
  // do a client-side navigation to /demo — matching useOpenDemoBooking on /new-home.
  useEffect(() => {
    const onMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === 'ss-open-demo') {
        router.push('/demo');
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [router]);

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
    </section>
  );
}
