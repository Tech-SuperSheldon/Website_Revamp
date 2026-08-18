"use client";
import React from "react";
import Image from "next/image";
import { assetUrl } from "@/lib/assetUrl";
import { AutoplayMutedVideo } from "@/components/AU/AutoplayMutedVideo";

const Review = () => {
  return (
    <section className="relative py-12 flex flex-col items-center text-center px-4 sm:px-6 lg:px-12">
      {/* Title */}
      <h2
        className="font-quicksand font-semibold text-center mb-6 leading-tight"
        style={{
          fontSize: "clamp(28px, 6vw, 50px)",
          lineHeight: "clamp(36px, 8vw, 70px)",
          letterSpacing: "-1px",
        }}
      >
        From Our <span className="text-red-400">Hearts</span> to
        <br /> Thousands of{" "}
        <span className="text-orange-400">Australian</span>
        <span className="text-orange-400"> Homes</span>
      </h2>

      {/* Subtitle */}
      <p className="text-sm sm:text-base md:text-lg font-poppins text-gray-600 max-w-xl leading-relaxed px-2">
        Guiding students and parents toward brighter futures every day.
      </p>

      {/* Cards */}
      <div className="mt-12 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="rounded-2xl bg-white overflow-hidden transform transition hover:-translate-y-2 duration-300 shadow-lg">
          <div className="w-full h-64 sm:h-72 md:h-80 overflow-hidden flex items-center justify-center bg-gray-50">
            <AutoplayMutedVideo
              src={assetUrl("/bento-analytics.mp4")}
              width={600}
              height={400}
              className="w-[140%] h-[140%] object-cover object-center"
            />
          </div>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl bg-white overflow-hidden transform transition hover:-translate-y-2 duration-300 shadow-lg">
          <div className="w-full h-64 sm:h-72 md:h-80 overflow-hidden flex items-center justify-center bg-gray-50">
            <AutoplayMutedVideo
              src={assetUrl("/bento-conversion.mp4")}
              width={600}
              height={400}
              className="w-[140%] h-[140%] object-cover object-center"
            />
          </div>
        </div>

        {/* Card 3 */}
        <div className="rounded-2xl bg-white overflow-hidden transform transition hover:-translate-y-2 duration-300 shadow-lg">
          <div className="w-full h-64 sm:h-72 md:h-80 overflow-hidden flex items-center justify-center bg-gray-50">
            <AutoplayMutedVideo
              src={assetUrl("/bento-meter.mp4")}
              width={600}
              height={400}
              className="w-[140%] h-[140%] object-cover object-center"
            />
          </div>
        </div>
      </div>

      {/* Floating Animations */}
      {/* Decorative floating icons. Source PNGs are multi-MB (alarm 4.6MB,
          calc 4.2MB, ruler 3.9MB) but only ever render at ~60px — next/image
          resizes + serves WebP (~5KB each) and lazy-loads them off-screen. */}
      <div className="absolute sm:bottom-6 -bottom-4 left-4 sm:left-8 -translate-x-1/3 animate-float1 z-10 rotate-[45]">
        <Image
          src="/icons/pencil.png"
          alt=""
          width={60}
          height={60}
          loading="lazy"
          className="w-10 h-10 sm:w-[60px] sm:h-[60px]"
        />
      </div>
      <div className="absolute sm:bottom-8 -bottom-4 right-4 sm:right-6 animate-float2 z-10">
        <Image
          src="/icons/alarm.png"
          alt=""
          width={60}
          height={60}
          loading="lazy"
          className="w-10 h-10 sm:w-[60px] sm:h-[60px]"
        />
      </div>
      <div className="absolute sm:top-4 top-32 left-12 sm:left-32 animate-float2 z-10">
        <Image
          src="/icons/calc.png"
          alt=""
          width={60}
          height={60}
          loading="lazy"
          className="w-10 h-10 sm:w-[60px] sm:h-[60px]"
        />
      </div>
      <div className="absolute sm:top-4 top-32 right-12 sm:right-32 animate-float1 z-10">
        <Image
          src="/icons/ruler.png"
          alt=""
          width={60}
          height={60}
          loading="lazy"
          className="w-10 h-10 sm:w-[60px] sm:h-[60px]"
        />
      </div>

      <style jsx>{`
        @keyframes float1 {
          0%,
          100% {
            transform: translateY(0) rotate(-45deg);
          }
          50% {
            transform: translateY(-12px) rotate(-45deg);
          }
        }
        @keyframes float2 {
          0%,
          100% {
            transform: translateX(0) rotate(45deg);
          }
          50% {
            transform: translateX(12px) rotate(45deg);
          }
        }
        .animate-float1 {
          animation: float1 4s ease-in-out infinite;
        }
        .animate-float2 {
          animation: float2 5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Review;
