
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";

export default function TestimonialVideoBoost() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Chrome autoplay unlock
  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.playsInline = true;
      v.play().catch(() => {});
    }
  }, []);

  // Auto play/pause based on viewport visibility
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            v.play().catch(() => {});
            setIsPlaying(true);
          } else {
            v.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(v);
    return () => observer.unobserve(v);
  }, []);

  // Manual play/pause toggle
  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;

    if (isPlaying) {
      v.pause();
      setIsPlaying(false);
    } else {
      v.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <section className="relative w-full overflow-hidden py-12 md:py-24 flex justify-center">
      {/* Outer Box */}
      <div className="relative w-full max-w-6xl bg-[#F5F5F5] rounded-3xl p-6 md:p-12 mx-4 md:mx-8 flex flex-col items-center justify-center">

        {/* Background Image */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <Image
            src="/UK/bgsuccess.png"
            alt="Background Pattern"
            fill
            className="object-cover object-center opacity-70"
            priority
          />
        </div>

        {/* Content Layout */}
        <div className="relative flex flex-col md:flex-row items-center justify-between w-full">

          {/* LEFT TEXT */}
          <div className="md:w-1/2 space-y-6 text-center md:text-left px-2 md:px-4">
            <p className="text-[#4338CA] font-semibold text-sm md:text-base">
              Why Super Sheldon
            </p>

            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Ace Your Exams with Super Sheldon: A Student's Story
            </h2>
          </div>

          {/* RIGHT: Slightly Larger Video */}
          <div className="relative md:w-1/2 flex justify-center items-center mt-16 md:mt-0">
            <div className="relative w-[75%] sm:w-[60%] md:w-[55%] max-w-xs">

              <div className="relative w-full rounded-xl overflow-hidden bg-black">
                <video
                  ref={videoRef}
                  src="/alextestimonial.mp4"
                  className="w-full rounded-xl"
                  playsInline
                  preload="auto"
                />

                {/* Small Button in Bottom-right now */}
                <button
                  onClick={togglePlay}
                  className="absolute bottom-3 right-3"
                >
                  <div className="bg-white/80 hover:bg-white rounded-full p-3 transition">
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-black" />
                    ) : (
                      <Play className="w-5 h-5 text-black" />
                    )}
                  </div>
                </button>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
