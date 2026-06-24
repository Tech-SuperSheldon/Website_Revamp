"use client";

import React from "react";
import { motion } from "framer-motion";
import { assetUrl } from "@/lib/assetUrl";
import { AutoplayMutedVideo } from "@/components/AutoplayMutedVideo";

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

export default function NSAnim() {
  return (
    <section className="py-8 md:py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-6 md:mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight"
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

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              {/* Clips are 3:2, so the frame matches that ratio and the video fills it
                  edge-to-edge (no side bars, no cropping). */}
              <div className="relative rounded-2xl overflow-hidden aspect-[3/2] bg-gray-50">
                <AutoplayMutedVideo
                  className="absolute inset-0 w-full h-full object-cover block"
                  src={video.src}
                />
                {/* Thick black bottom bar */}
                {/* <div className="absolute bottom-0 left-0 right-0 h-7 bg-black rounded-b-2xl" /> */}
              </div>
              
              <div className="mt-6 text-center md:text-left">
                <h3 className="text-orange-500 text-xl md:text-2xl font-bold mb-2 tracking-tight">
                  {video.title}
                </h3>
                <p className="text-gray-900 text-sm md:text-base font-medium leading-relaxed">
                  {video.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
