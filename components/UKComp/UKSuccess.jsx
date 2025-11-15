

"use client";
import Image from "next/image";

export default function UKExamSuccess() {
  return (
    <section className="relative w-full bg-[#CFF2FF] overflow-hidden py-12 md:py-24 flex justify-center">
      {/* Outer Wrapper with Grey Background Box */}
      <div className="relative w-full max-w-6xl bg-[#F5F5F5] rounded-3xl p-6 md:p-12 mx-4 md:mx-8 overflow-visible flex flex-col items-center justify-center">
        {/* Background Image inside Grey Box */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <Image
            src="/UK/bgsuccess.png"
            alt="Background Pattern"
            fill
            className="object-cover object-center opacity-70"
            priority
          />
        </div>
        {/* Content Wrapper */}
        <div className="relative flex flex-col md:flex-row items-center justify-between w-full">
          {/* Left Text Content */}
          <div className="md:w-1/2 space-y-6 text-center md:text-left px-2 md:px-4">
            <p className="text-[#4338CA] font-semibold text-sm md:text-base">
              Why Super Sheldon
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Boost Your UK Exam Odds with a Proven Success Rate
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Boost Your UK Exam Success with a Proven Track Record
            </p>

            {/* Stats Row */}
            <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-8 mt-6">
              <div>
                <p className="text-4xl font-bold text-[#4338CA]">4x ↑</p>
                <p className="text-gray-800 text-sm md:text-base">
                  Increase Chance
                </p>
              </div>
              <div>
                <p className="text-4xl font-bold text-[#4338CA]">70% ↑</p>
                <p className="text-gray-800 text-sm md:text-base">
                  Admission to top university
                </p>
              </div>
            </div>
          </div>
<div className="relative md:w-1/2 flex justify-center mt-16 md:mt-0">
  <div className="relative w-full sm:w-2/3 md:w-full max-w-md -mt-12 md:-mt-16 z-10 flex justify-center">
    <Image
      src="/UK/successimg.png"
      alt="Teacher and Student"
      width={500}
      height={400}
      className="object-contain md:object-cover rounded-3xl w-full h-auto"
      priority
    />
  </div>
</div>
        </div>
      </div>
    </section>
  );
}
