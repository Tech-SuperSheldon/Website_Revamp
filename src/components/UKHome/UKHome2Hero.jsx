'use client';

// Loader for the /uk/home 3D WebGL hero. Same bundle/behavior as Home2Hero,
// pointed at the UK-reskinned static copy (see public/uk-home2-hero/) whose
// overlay phone-CTA uses blue accents and a +44 dial code instead of +61.
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UKHome2Hero() {
  const [mounted, setMounted] = useState(true);
  const sectionRef = useRef(null);
  const router = useRouter();

  // The hero's phone CTA is injected inside the same-origin iframe (see
  // public/uk-home2-hero/index.html). On a valid submit it postMessages us so we can
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

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100svh] bg-[#dfd1bc] overflow-hidden rounded-b-[2rem] md:rounded-b-[3.5rem] mb-10 md:mb-16"
    >
      {mounted && (
        <iframe
          src="/uk-home2-hero/index.html"
          title="3D Hero Animation"
          className="block h-full w-full border-0"
          allow="autoplay; fullscreen"
        />
      )}
    </section>
  );
}
