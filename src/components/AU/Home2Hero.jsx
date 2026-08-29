'use client';

// Loader for the /home2 3D WebGL hero. The iframe pulls in ~3MB (Three.js
// bundle + GLB models + textures; audio is stripped from the embed build —
// see idea_website/portfolio-2025 VITE_SOUNDS), mounts immediately on page
// load so the scene is visible as soon as it's ready (no interstitial
// loading screen — the iframe's own internal preloader is disabled via CSS,
// see public/home2-hero/assets/CNUUonPj.css), and unmounts once the user has
// scrolled well past it. The bundle runs a continuous WebGL render loop with
// no visibility-based pause of its own, so leaving it mounted indefinitely
// burns CPU/GPU for the whole session and starves later sections (e.g. the
// video-heavy "Why Choose" cards) of main-thread time. Unmounting fully
// tears down that render loop; remounting (if the user scrolls back up) is
// cheap since the payload is cached (Cache-Control: max-age=2592000). See
// public/home2-hero/.
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home2Hero() {
  const [mounted, setMounted] = useState(true);
  // Height of everything stacked above the hero in normal flow (deadline
  // banner + sticky header). See the measuring effect below.
  const [topOffset, setTopOffset] = useState(0);
  const sectionRef = useRef(null);
  const router = useRouter();

  // The hero's phone CTA is injected inside the same-origin iframe (see
  // public/home2-hero/index.html). On a valid submit it postMessages us so we can
  // do a client-side navigation to /demo — matching useOpenDemoBooking on /new-home.
  useEffect(() => {
    const onMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === 'ss-open-demo') {
        router.push('/au/demo');
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [router]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    // 400px top margin: keep the render loop alive for a bit after the
    // section leaves view (avoids mount/unmount thrash on small back-scrolls)
    // and remount well before it's scrolled back into view.
    const observer = new IntersectionObserver(
      ([entry]) => setMounted(entry.isIntersecting),
      { rootMargin: '400px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // The deadline banner and the (stacked) header sit above this section in
  // normal flow, so a flat 100svh hero overflows the viewport by their
  // combined height. The iframe anchors its scan caption ("SuperSheldon ·
  // Australia" + the typed description) to its OWN bottom edge, which then
  // falls off screen on mobile — the box gets clipped by the browser chrome.
  // Measure whatever is stacked above us and shrink the section by that much
  // so the hero always ends at the bottom of the visible viewport.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const measure = () => {
      // Document-relative top of the hero == combined height of the banner +
      // header (sticky elements keep their layout position, so this stays
      // correct while scrolling).
      const top = el.getBoundingClientRect().top + window.scrollY;
      // Never surrender more than 40% of the viewport, so an unusually tall
      // banner can't squash the 3D scene into a sliver.
      const capped = Math.min(Math.max(top, 0), window.innerHeight * 0.4);
      setTopOffset((prev) => (Math.abs(prev - capped) < 1 ? prev : capped));
    };
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('orientationchange', measure);
    // Re-measure when the layout above changes — banner dismissed, banner text
    // rewrapping on rotate, etc. Observing the parent covers removals of our
    // previous siblings, which a ResizeObserver on the banner itself would not.
    const ro =
      typeof ResizeObserver !== 'undefined' && el.parentElement
        ? new ResizeObserver(measure)
        : null;
    ro?.observe(el.parentElement);
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('orientationchange', measure);
      ro?.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ height: `calc(100svh - ${topOffset}px)` }}
      className="relative w-full h-[100svh] bg-[#dfd1bc] overflow-hidden rounded-b-[2rem] md:rounded-b-[3.5rem] mb-10 md:mb-16"
    >
      {mounted && (
        <iframe
          src="/home2-hero/index.html"
          title="3D Hero Animation"
          className="block h-full w-full border-0"
          allow="autoplay; fullscreen"
        />
      )}
    </section>
  );
}
