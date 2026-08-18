"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
import { assetUrl } from "@/lib/assetUrl";
import { AutoplayMutedVideo } from "@/components/AU/AutoplayMutedVideo";

const videos = [
  {
    id: 1,
    src: assetUrl("/newsite/anim/1.mp4"),
    title: "Dashboard Features",
    description: "Access everything you need to succeed, all in one place.",
  },
  {
    id: 2,
    src: assetUrl("/newsite/anim/2.mp4"),
    title: "Quiz Activity",
    description: "Engaging quizzes to test and reinforce your knowledge.",
  },
  {
    id: 3,
    src: assetUrl("/newsite/anim/3.mp4"),
    title: "Personalized Menu",
    description: "A learning experience tailored uniquely to your goals.",
  },
  {
    id: 4,
    src: assetUrl("/newsite/anim/4.mp4"),
    title: "Progress Report",
    description: "Track your growth and celebrate every milestone.",
  },
];

function MobileCard({
  i,
  data,
  progress,
  range,
}: {
  i: number;
  data: (typeof videos)[0];
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const [start, end] = range;
  const isFirst = i === 0;
  const scale = useTransform(progress, [start, end], [0.95, 1]);
  const y = useTransform(progress, [start, end], ["120%", "0%"]);

  return (
    <motion.div
      style={{
        scale: isFirst ? 1 : scale,
        y: isFirst ? 0 : y,
        zIndex: i,
      }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 bg-white rounded-[2rem] border border-gray-100"
    >
      <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-gray-50 shrink-0">
        <AutoplayMutedVideo
          className="w-full h-full object-cover block"
          src={data.src}
        />
      </div>
      <div className="text-center px-2">
        <h3 className="text-orange-500 text-base font-bold mb-1 tracking-tight">
          {data.title}
        </h3>
        <p className="text-gray-900 text-xs font-medium leading-snug">
          {data.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function NSAnim() {
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: mobileContainerRef,
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
    <>
      {/* ── MOBILE: sticky scroll stacking cards ── */}
      <section ref={mobileContainerRef} className="md:hidden h-[320vh] relative -mt-[6vh]">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-start overflow-hidden pt-[13vh] gap-4">
          {/* Header — sits at the top with the cards right below it */}
          <div className="text-center px-4 shrink-0 z-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">
              The <span className="text-orange-500">SuperSheldon</span> Experience
            </h2>
            <p className="text-gray-600 text-sm">
              Witness the qualities that make us the preferred choice for thousands.
            </p>
          </div>

          {/* Card stack */}
          <div className="relative w-[calc(100%-2rem)] h-[42vh] overflow-hidden rounded-[2rem]">
            {videos.map((video, i) => {
              const rangeStart = (i - 1) / (videos.length - 1);
              const rangeEnd = i / (videos.length - 1);
              return (
                <MobileCard
                  key={video.id}
                  i={i}
                  data={video}
                  progress={smoothProgress}
                  range={[rangeStart, rangeEnd]}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DESKTOP: original grid (untouched) ── */}
      <section className="hidden md:block py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="text-5xl font-bold text-gray-900 mb-4 tracking-tight"
            >
              The <span className="text-orange-500">SuperSheldon</span> Experience
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 max-w-2xl mx-auto text-lg"
            >
              Witness the qualities that make us the preferred choice for thousands.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[3/2] bg-gray-50">
                  <AutoplayMutedVideo
                    className="absolute inset-0 w-full h-full object-cover block"
                    src={video.src}
                  />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-orange-500 text-2xl font-bold mb-2 tracking-tight">
                    {video.title}
                  </h3>
                  <p className="text-gray-900 text-base font-medium leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
