

"use client";

import Image from "next/image";
import Link from "next/link";
import { useOpenDemoBooking } from "../utils/navigation";
import GlossyButton from "../GlossyButton";

export default function UKCredits() {
  return (

    <section className=" relative w-[95%] sm:w-[90%] mx-auto -mt-12 sm:-mt-12 px-4 overflow-hidden">
      {/* Pill background */}
      <div className="w-full bg-[#E1E9FE] rounded-[9999px] py-10 px-8 sm:px-12 mb-12 shadow-md relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 items-center text-center justify-center">
          
          {/* 1. Trusted Feedback */}
          <div className="flex flex-col items-center justify-center space-y-5">
            <p className="text-xl sm:text-2xl font-semibold">Trusted Feedback</p>
            <div className="flex items-start justify-center gap-10 ">
              {/* Trustpilot */}
              <div className="flex flex-col items-center">
                <Image
                  src="/trustpilot.png"
                  alt="Trustpilot"
                  width={110}
                  height={110}
                  className="object-contain h-auto"
                />
                <p className="text-sm sm:text-base text-[#4E5566] mt-2">
                  TrustScore 4.9 (395 reviews)
                </p>
              </div>

              {/* Google */}
              <div className="flex flex-col items-center">
                <Image
                  src="/googlev2.png"
                  alt="Google Reviews"
                  width={120}
                  height={120}
                  className="object-contain h-auto"
                />
                <p className="text-sm sm:text-base text-[#4E5566] mt-2">
                  278 reviews
                </p>
              </div>
            </div>
          </div>

          {/* 2. Accredited By */}
          <div className="flex flex-col items-center justify-center space-y-3">
            <p className="text-xl sm:text-2xl font-semibold">Accredited by</p>
            <Image
              src="/Stem.png"
              alt="STEM Accredited"
              width={160}
              height={90}
              className="object-contain h-auto"
            />
          </div>

          {/* 3. 80% Confidence */}
          <div className="flex flex-col items-center justify-center space-y-3">
            <p className="text-[#1D2026] font-semibold text-lg sm:text-xl leading-snug text-center">
              80% learners show increased 
              <br className="hidden sm:block" />
               confidence in 2 weeks
            </p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      {/* <div className="text-center mx-auto mt-10 relative z-20 mb-2">
        
          <GlossyButton onClick={useOpenDemoBooking()}>Try a free Class</GlossyButton>
        
      </div> */}
    </section>
  );
}
