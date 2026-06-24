"use client";

import { useEffect, useRef, type ReactNode, type VideoHTMLAttributes } from "react";

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

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    void video.play().catch(() => {});
  }, [src, playKey]);

  // Pause when scrolled off-screen so dozens of videos don't all decode at once.
  useEffect(() => {
    const video = ref.current;
    if (!video || typeof IntersectionObserver === "undefined") return;
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
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      className={className}
      autoPlay
      muted
      playsInline
      loop
      preload="none"
      {...rest}
    >
      {children}
    </video>
  );
}
