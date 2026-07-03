"use client";

import { useEffect, useRef, useState, type ReactNode, type VideoHTMLAttributes } from "react";

type Props = Omit<
  VideoHTMLAttributes<HTMLVideoElement>,
  "autoPlay" | "muted" | "playsInline" | "loop" | "preload"
> & {
  /** Bump when using `<source>` children so play() re-runs after load */
  playKey?: string | number;
  children?: ReactNode;
};

export function AutoplayMutedVideo({
  className,
  src,
  playKey,
  children,
  ...rest
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  // Lazy-mount the source. `src` is attached ONLY once the element is near the
  // viewport. Until then the <video> has no src, so the browser fetches nothing.
  //
  // Why this and not just preload="none" + play-on-intersect: measured on
  // /new-home, ~28MB of decorative video still downloaded on initial load with
  // that approach, because (a) the play-observer's first callback can fire during
  // layout, and (b) responsive duplicates (e.g. NSAnim renders a mobile sticky
  // stack AND a desktop grid) still trigger loads even while CSS-hidden. Gating
  // the src removes the fetch entirely until the clip is actually approaching.
  const [mountSrc, setMountSrc] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (typeof IntersectionObserver === "undefined") {
      setMountSrc(true); // no IO support -> fall back to eager
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setMountSrc(true);
            observer.disconnect(); // mount once; play/pause is handled below
            break;
          }
        }
      },
      // Start fetching ~a viewport early so the clip is ready as it scrolls in.
      { rootMargin: "400px 0px" }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // Play when on-screen, pause when off-screen (only meaningful once src is set).
  useEffect(() => {
    const video = ref.current;
    if (!video || !mountSrc || typeof IntersectionObserver === "undefined") return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            void video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [mountSrc, playKey]);

  return (
    <video
      ref={ref}
      // No `autoPlay` and no `src` until near-viewport — see comment above.
      src={mountSrc ? (src as string | undefined) : undefined}
      className={className}
      muted
      playsInline
      loop
      preload="none"
      {...rest}
    >
      {mountSrc ? children : null}
    </video>
  );
}
