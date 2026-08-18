"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const LazyNovaChatbot = dynamic(() => import("@/components/AU/NovaChatbot"), {
  ssr: false,
  loading: () => null,
});

const LazyFloatingArrowWhatsApp = dynamic(() => import("@/components/AU/ArrowAndWhatsapp"), {
  ssr: false,
  loading: () => null,
});

const LazyNSCookieConsent = dynamic(() => import("@/components/AU/NSCookieConsent"), {
  ssr: false,
  loading: () => null,
});

const LazyScrollToTop = dynamic(() => import("@/components/AU/ScrollToTop"), {
  ssr: false,
  loading: () => null,
});

export function DeferredSection({
  children,
  fallback = null,
  rootMargin = "400px 0px",
  threshold = 0.15,
  once = true,
}) {
  const [isReady, setIsReady] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    if (isReady || typeof window === "undefined") return undefined;

    const node = elementRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsReady(true);
          if (once) observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isReady, once, rootMargin, threshold]);

  return <div ref={elementRef}>{isReady ? children : fallback}</div>;
}

export default function DeferredWidgets({
  mobileHidden = true,
  side = "right",
  mobileBar = true,
}) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const start = () => {
      if (!cancelled) setIsReady(true);
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 2000 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback?.(id);
      };
    }

    const id = window.setTimeout(start, 1800);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, []);

  if (!isReady) return null;

  return (
    <>
      <LazyScrollToTop />
      <LazyNSCookieConsent />
      <LazyFloatingArrowWhatsApp side={side} mobileBar={mobileBar} />
      <LazyNovaChatbot mobileHidden={mobileHidden} />
    </>
  );
}
