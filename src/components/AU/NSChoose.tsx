"use client";

import { useRef } from "react";
import { useScroll, useSpring, useTransform, motion, MotionValue } from "framer-motion";
import { assetUrl } from "@/lib/assetUrl";
import { AutoplayMutedVideo } from "@/components/AU/AutoplayMutedVideo";

const slides = [
  {
    video: assetUrl("/videos/vid1.mp4"),
    heading: "AI-Powered Level-Up Learning",
    desc: "SuperSheldon offers an AI-driven learning app that helps students level up their skills, with personalized study plans from NAPLAN to HSC exam preparation.",
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
    heading: "Trusted by Families Across Australia",
    desc: "SuperSheldon is a trusted platform, used and loved by families across Australia.",
    color: "#8b5cf6", // Violet-500
  },
];

export default function NSChoose() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth the raw scroll value so card transitions feel buttery instead of
  // snapping 1:1 with every scroll tick (main cause of the "fast/glitchy" feel).
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section ref={containerRef} className="h-[320vh] md:h-[300vh] relative">
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
            const rangeStart = (i - 1) / (slides.length - 1);
            const rangeEnd = i / (slides.length - 1);

            return (
              <Card
                key={i}
                i={i}
                data={slide}
                progress={smoothProgress}
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
  const y = useTransform(progress, [start, end], ["120%", "0%"]);

  const isFirst = i === 0;

  return (
    <motion.div
      style={{
        scale: isFirst ? 1 : scale,
        opacity: opacity,
        y: isFirst ? 0 : y,
        zIndex: i,
      }}
      className="absolute w-full h-full md:h-auto flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 md:gap-12 p-4 md:p-8 bg-white rounded-[2rem] border border-gray-100"
    >
      {/* Visual Side (Video/Image) */}
      {/* FIX: Changed h-[40vh] to aspect-video on mobile to prevent cropping */}
      <div className="w-full md:w-1/2 aspect-video md:h-[50vh] md:aspect-auto shrink-0 bg-gray-100 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm relative group">
         <AutoplayMutedVideo
           src={data.video}
           className="absolute inset-0 w-full h-full object-cover"
         />
      </div>

      {/* Text Side */}
      <div className="w-full md:w-5/12 text-center md:text-left p-2 md:p-4 overflow-y-auto">
        <h3 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6" style={{ color: data.color }}>
          {data.heading}
        </h3>
        <p className="text-gray-600 text-sm md:text-xl leading-relaxed">
          {data.desc}
        </p>
      </div>

    </motion.div>
  );
}