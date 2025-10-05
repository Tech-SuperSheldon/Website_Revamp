"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    title: "Various features",
    desc: "Weekly Exam Insights, PTM Reports and Actionable Feedback.",
    images: ["/scroller/5.jpg", "/scroller/1.png"],
  },
  {
    title: "Interactive Sessions",
    desc: "Interactive sessions to keep your child engaged.",
    images: ["/scroller/2.png", "/scroller/3.png"],
  },
  {
    title: "Experienced Tutors",
    desc: "Tutors with vast Knowledge and Experience for your child.",
    images: ["/scroller/4.png", "/scroller/5.jpg"],
  },
  {
    title: "24x7 Support",
    desc: "Support from our help desk 24x7.",
    images: ["/scroller/1.png", "/scroller/2.png"],
  },
  {
    title: "Track Progress",
    desc: "Track your child's progress and performance through our portal.",
    images: ["/scroller/3.png", "/scroller/4.png"],
  },
];

export default function FeatureSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto switch every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-start justify-center gap-6 px-6 md:px-12 py-8 w-full max-w-[1200px] mx-auto">
      {/* Left menu */}
      <div className="w-full md:w-1/3 space-y-6">
        {features.map((f, i) => (
          <motion.div
            key={i}
            onClick={() => setActiveIndex(i)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`p-6 rounded-xl cursor-pointer transition-all relative overflow-hidden text-left`}
            style={{
              borderLeft:
                i === activeIndex ? "6px solid orange" : "6px solid transparent",
            }}
          >
            <div className="relative z-10">
              <h3
                className={`font-semibold text-lg md:text-xl ${
                  i === activeIndex ? "text-purple-600" : "text-gray-900"
                }`}
              >
                {f.title}
              </h3>
              <p
                className={`text-sm md:text-base mt-1 ${
                  i === activeIndex ? "text-gray-600" : "text-gray-500"
                }`}
              >
                {f.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Right content: Two separate images */}
      <div className="w-full md:w-2/3 flex flex-col md:flex-row items-center justify-between gap-6">
        <AnimatePresence mode="wait">
          {features[activeIndex].images.map((img, idx) => (
            <motion.div
              key={idx + "-" + activeIndex}
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -50, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative w-full md:w-1/2 rounded-2xl shadow-xl overflow-hidden"
            >
              <img
                src={img}
                alt={`${features[activeIndex].title} ${idx + 1}`}
                className="w-full h-[350px] object-cover"
              />
              <div className="absolute bottom-0 left-0 p-4 bg-black/50 text-white w-full">
                <h4 className="font-semibold text-lg">{features[activeIndex].title}</h4>
                <p className="text-sm mt-1">{features[activeIndex].desc}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
