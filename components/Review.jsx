


"use client";
import React from "react";

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
        <div
          className="rounded-2xl bg-white overflow-hidden transform transition hover:-translate-y-2 duration-300"
          style={{ boxShadow: "-6px 6px 0px #000000" }}
        >
          <div className="bg-[#58D2A8] px-6 py-6">
            <h3 className="font-rowdies text-left font-bold text-xl sm:text-2xl text-white">
              01. Learn
            </h3>
          </div>
          <div className="px-6 py-6 text-left">
            <p className="font-poppins text-sm sm:text-base md:text-lg text-gray-700">
              82% of Supersheldon parents agree their child’s grades have
              improved.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div
          className="rounded-2xl bg-white overflow-hidden transform transition hover:-translate-y-2 duration-300"
          style={{ boxShadow: "-6px 6px 0px #000000" }}
        >
          <div className="bg-[#FF6B2C] px-6 py-6">
            <h3 className="font-rowdies text-left font-bold text-xl sm:text-2xl text-white">
              02. Academics
            </h3>
          </div>
          <div className="px-6 py-6 text-left">
            <p className="font-poppins text-sm sm:text-base md:text-lg text-gray-700">
              95% of Supersheldon parents celebrate their child’s improved
              grades and academic success.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div
          className="rounded-2xl bg-white overflow-hidden transform transition hover:-translate-y-2 duration-300"
          style={{ boxShadow: "-6px 6px 0px #000000" }}
        >
          <div className="bg-[#2F2467] px-6 py-6">
            <h3 className="font-rowdies text-left font-bold text-xl sm:text-2xl text-white">
              03. Parents Feedback
            </h3>
          </div>
          <div className="px-6 py-6 text-left">
            <p className="font-poppins text-sm sm:text-base md:text-lg text-gray-700">
              85% of Supersheldon parents agree their child is more confident.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Animations */}
      <div className="absolute sm:bottom-6 -bottom-4 left-4 sm:left-8 -translate-x-1/3 animate-float1 z-10 rotate-[45]">
        <img
          src="/icons/pencil.png"
          alt="book"
          className="w-10 h-10 sm:w-[60px] sm:h-[60px]"
        />
      </div>
      <div className="absolute sm:bottom-8 -bottom-4 right-4 sm:right-6 animate-float2 z-10">
        <img
          src="/icons/alarm.png"
          alt="backpack"
          className="w-10 h-10 sm:w-[60px] sm:h-[60px]"
        />
      </div>
      <div className="absolute top-4 left-12 sm:left-32 animate-float2 z-10">
        <img
          src="/icons/calc.png"
          alt="lamp"
          className="w-10 h-10 sm:w-[60px] sm:h-[60px]"
        />
      </div>
      <div className="absolute top-4 right-12 sm:right-32 animate-float1 z-10">
        <img
          src="/icons/ruler.png"
          alt="scholar cap"
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
