
"use client"
import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

// Full "Know Your Teacher" poster cards. Name, qualification and photo are all
// baked into each 1080x1080 image, so the card just renders the whole poster
// square (object-cover = perfect fit, no cropping). Images live in
// /public/teachers. `name` is kept only for the img alt text / accessibility.
const teachers = [
  { id: 1,  name: "Khushi Chaubey",   image: "/teachers/khushi-chaubey.png" },
  { id: 2,  name: "Arfa Zainab",      image: "/teachers/arfa-zainab.png" },
  { id: 3,  name: "Ruchi Arya",       image: "/teachers/ruchi-arya.png" },
  { id: 4,  name: "Shahar Banu S",    image: "/teachers/shahar-banu.png" },
  { id: 5,  name: "Shalini Mahadik",  image: "/teachers/shalini-mahadik.png" },
  { id: 6,  name: "Shraddha Kamat",   image: "/teachers/shraddha-kamat.png" },
  { id: 7,  name: "Diana Pereira",    image: "/teachers/diana-pereira.png" },
  { id: 8,  name: "Gitartha Dutta",   image: "/teachers/gitartha-dutta.png" },
  { id: 9,  name: "Preksha Sharma",   image: "/teachers/preksha-sharma.png" },
  { id: 10, name: "Ridhima",          image: "/teachers/ridhima.png" },
  { id: 11, name: "Rupanshi Kalra",   image: "/teachers/rupanshi-kalra.png" },
  { id: 12, name: "Muniba Elahi",     image: "/teachers/muniba-elahi.png" },
];

export default function TeacherCarousel() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      void controls.start({
        x: ["0%", "-100%"],
        transition: { repeat: Infinity, duration: 60, ease: "linear" },
      });
    } else {
      controls.stop();
    }
  }, [isInView, controls]);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden py-6 md:py-10">
      {/* Header */}
      <div className="text-center mb-6 md:mb-10 px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          Meet Our <span className="text-[#e87f1e]">Teachers</span>
        </h2>
        <p className="mt-3 text-gray-500 text-sm md:text-base max-w-xl mx-auto">
          Expert mentors from around the world, dedicated to your child&apos;s success.
        </p>
      </div>

      {/* Scrolling Cards */}
      <motion.div className="flex gap-5 md:gap-6" animate={controls}>
        {[...teachers, ...teachers].map((teacher, index) => (
          <div
            key={index}
            className="relative aspect-square w-[240px] md:w-[320px] shrink-0 rounded-2xl shadow-md overflow-hidden bg-white transition duration-500 hover:shadow-lg hover:shadow-gray-400/60 hover:scale-[1.03]"
          >
            <img
              src={teacher.image}
              alt={teacher.name}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
