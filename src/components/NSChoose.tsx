"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { assetUrl } from "@/lib/assetUrl";
import { AutoplayMutedVideo } from "@/components/AutoplayMutedVideo";

const slides = [
  {
    video: assetUrl("/videos/vid1.mp4"),
    heading: "AI-Powered Level-Up Learning",
    desc: "SuperSheldon offers an AI-driven learning app that helps students level up their skills, with personalized study plans from NAPLAN to SAT exam preparation.",
    color: "#eab308", // Yellow-500
  },
  {
    video: assetUrl("/videos/vid2.mp4"),
    heading: "1:1 Online Sessions",
    desc: "Students get live one-on-one online sessions with qualified teachers, supported by AI-generated feedback summaries for clear progress tracking.",
    color: "#f97316", // Orange-500
  },
  {
    video: assetUrl("/videos/vid3.mp4"),
    heading: "Course Completion Certification",
    desc: "Learners receive an official course completion certificate, recognizing their achievement and learning milestones.",
    color: "#ec4899", // Pink-500
  },
  {
    video: assetUrl("/videos/vid4.mp4"),
    heading: "Trusted by Families Worldwide",
    desc: "SuperSheldon is a globally trusted platform, used and loved by families across the UK, Australia, and the USA.",
    color: "#8b5cf6", // Violet-500
  },
];

export default function NSChoose() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="h-[300vh]  relative">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Section Header */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute top-8 md:top-12 z-50 text-center w-full px-4"
        >
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-2 tracking-tight">
             Why Choose <span className="text-orange-500">SuperSheldon</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-lg max-w-xl mx-auto">
             Scroll to explore the future of personalized education.
          </p>
        </motion.div>

        {/* Cards Stack */}
        <div className="relative w-full max-w-[95%] 2xl:max-w-7xl h-[60vh] md:h-[80vh] flex items-center justify-center mt-6 md:mt-0 overflow-hidden rounded-[2rem]">
          {slides.map((slide, i) => {
            const targetScale = 1 - (slides.length - 1 - i) * 0.05; 
            const rangeStart = (i - 1) / (slides.length - 1);
            const rangeEnd = i / (slides.length - 1);
            
            return (
              <Card
                key={i}
                i={i}
                data={slide}
                progress={scrollYProgress}
                range={[rangeStart, rangeEnd]}
                total={slides.length}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Card({
  i,
  data,
  progress,
  range,
  total,
}: {
  i: number;
  data: typeof slides[0];
  progress: MotionValue<number>;
  range: [number, number];
  total: number;
}) {
  const [start, end] = range;
  
  // Opacity: Always 1 (No transparency)
  const opacity = 1; 

  // Scale: Small pop effect
  const scale = useTransform(progress, [start, end], [0.95, 1]);
  
  // Y Transform Logic:
  // "Coming from below". 
  // We want the NEXT card to just peek at the bottom.
  // So at start of range, y should be just visible (e.g., 90% or 100vh - peek amount).
  // But wait, if we want ONLY the next card visible, we need to control the stack.
  // With `sticky`, all cards are technically there.
  // Helper: We can use a larger start value? 
  // If we set Y to "100%", it's just off screen.
  // If we want it to peek, maybe "85%"?
  
  const y = useTransform(progress, [start, end], ["120%", "0%"]);
  
  // To ensure *only* the next card is visible at the bottom, we might need to clamp/hide future cards.
  // But `useTransform` maps strictly to the progress range.
  // If Card 2's range is [0.33, 0.66], then at progress 0, it's at "120%".
  // This pushes it off screen.
  // If we want it to peek, we can adjust the start value or the input range.
  // However, with 120%, it should be hidden until it starts moving.
  // If user wants "only next card visible", 120% is good (hidden).
  // If they want "visible at the bottom" (peeking), we can do "90%".
  // Let's try to stick with "110%" to be safe and ensure smooth entry.
  
  const isFirst = i === 0;

  return (
    <motion.div
      style={{
        scale: isFirst ? 1 : scale,
        opacity: opacity,
        y: isFirst ? 0 : y,
        zIndex: i,
      }}
      className="absolute w-full h-full md:h-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-12 p-4 md:p-8 bg-white rounded-[2rem] border border-gray-100"
    >
      {/* Visual Side (Video/Image) */}
      <div className="w-full md:w-1/2 h-[40vh] md:h-[50vh] bg-gray-100 rounded-3xl overflow-hidden shadow-sm relative group">
         <AutoplayMutedVideo
            src={data.video}
            className="absolute inset-0 w-full h-full object-cover"
         />
      </div>

      {/* Text Side */}
      <div className="w-full md:w-5/12 text-center md:text-left p-4">
        <h3 className="text-2xl md:text-5xl font-bold mb-6" style={{ color: data.color }}>
          {data.heading}
        </h3>
        <p className="text-gray-600 text-base md:text-xl leading-relaxed">
          {data.desc}
        </p>
      </div>

    </motion.div>
  );
}