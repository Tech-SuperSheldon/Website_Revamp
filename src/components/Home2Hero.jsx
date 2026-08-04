'use client';

// Deferred loader for the /home2 3D WebGL hero. The iframe pulls in ~3MB
// (Three.js bundle + GLB models + textures; audio is stripped from the embed
// build — see idea_website/portfolio-2025 VITE_SOUNDS) and runs a continuous
// WebGL render loop once mounted, so we only mount it on the user's first
// interaction (scroll/click/touch/keypress) rather than on an idle timer —
// the render loop itself (not just the initial load) is expensive enough
// that starting it automatically tanks Total Blocking Time even on a fast
// machine. Passive visitors see the static poster indefinitely; anyone who
// engages with the page gets the full 3D scene exactly as before. When the
// iframe document finishes loading we crossfade the poster out. See
// public/home2-hero/.
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

    // Only start on real user intent — no idle-timer auto-start. The WebGL
    // scene's render loop runs continuously once mounted, so auto-starting
    // it (even at idle) means every visitor pays that main-thread cost
    // whether or not they ever engage with the hero.
    const opts = { once: true, passive: true };
    const events = ['pointerdown', 'touchstart', 'wheel', 'keydown'];
    events.forEach((e) => window.addEventListener(e, start, opts));

    return () => {
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
