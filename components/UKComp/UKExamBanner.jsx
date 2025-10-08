// components/UKExamBanner.jsx
"use client";
import React from "react";


import UKGlossyButton from "./UKGlossybutton";

const UKExamBanner = () => {
  return (
    <div className="flex justify-center p-4">
      <div className="relative w-full max-w-6xl h-auto min-h-[220px] rounded-2xl overflow-visible px-6 md:px-10 lg:px-12 py-8 flex items-center justify-between bg-indigo-900 shadow-xl dark:bg-indigo-950">
        
        {/* Text Section */}
        <div className="flex flex-col z-10 space-y-4">
          <div className="text-white text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            Expert-Curated
            <span className="ml-3 inline-block bg-yellow-400 text-indigo-900 px-3 py-1 rounded-lg text-2xl md:text-3xl lg:text-4xl font-bold shadow-md">
              UK Exam
            </span>
          </div>
          <div className="text-white text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">Materials</div>

          {/* Stats */}
          <div className="flex space-x-10 mt-3 text-white">
            <div>
              <div className="text-3xl font-extrabold">2.5K+</div>
              <div className="text-xs md:text-sm opacity-80 mt-1">UK Active Students</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold">328+</div>
              <div className="text-xs md:text-sm opacity-80 mt-1">Best Instructors</div>
            </div>
          </div>

          {/* Button */}
          <UKGlossyButton>
            Try a free Class
          </UKGlossyButton>
        </div>

        {/* Image Section */}
        <div className="absolute right-0 bottom-0 z-0 flex justify-end items-end">
          <img
            src="/UK/banner1.png"
            alt="UK Exam Students and Instructors"
            className="h-[260px] md:h-[300px] lg:h-[340px] object-contain drop-shadow-2xl"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-10 rounded-2xl z-0"></div>
      </div>
    </div>
  );
};

export default UKExamBanner;
