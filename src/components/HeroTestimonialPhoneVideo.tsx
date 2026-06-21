"use client";

import { useEffect, useRef } from "react";
import { assetUrl } from "@/lib/assetUrl";

const HERO_PHONE_VIDEO_SRC = assetUrl("/newsite/pythonvid.mp4");

type Props = {
  videoClassName: string;
  badgeClassName: string;
  badgeLabel?: string;
};

export function HeroTestimonialPhoneVideo({
  videoClassName,
  badgeClassName,
  badgeLabel = "python",
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    void video.play().catch(() => {});
  }, []);

  return (
    <>
      <video
        ref={ref}
        src={HERO_PHONE_VIDEO_SRC}
        className={videoClassName}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      <div className={badgeClassName}>{badgeLabel}</div>
    </>
  );
}
