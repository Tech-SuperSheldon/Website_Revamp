



"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

import { Play, Pause } from "lucide-react";

export default function E11Experience() {
  const testimonials = [
    {
      image: "/eleven/exp/1.jpg",
      name: "Mary Brett",
      testimonial: "Supersheldon has helped my child excel in their studies!",
      stars: 5,
    },
    {
      image: "/eleven/exp/2.jpg",
      name: "Ellie White",
      testimonial: "My child can focus for hours on end without any distractions.",
      stars: 4,
    },
    {
      image: "/eleven/exp/3.jpg",
      name: "Dean Winchester",
      testimonial: "The progress tracker is a blessing in disguise.",
      stars: 5,
    },
  ];

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-pause when out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const videoSrc = "/studentvid.mp4"; // replace with your video path

  return (
    <section className="w-full py-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
      {/* Left Video Section */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 relative flex justify-center items-center"
      >
        <div className="relative">
          {/* Background shadow layers */}
          <div className="absolute -bottom-6 -right-6 w-[90%] h-[90%] rounded-2xl bg-[#FFDAD1] -z-2"></div>
          <div className="absolute -top-4 -left-4 w-[95%] h-[95%] rounded-2xl bg-[#E5E5E5] -z-2"></div>

          {/* Video Container */}
          <div className="w-[420px] h-[280px] md:w-[520px] md:h-[340px] rounded-2xl overflow-hidden border border-gray-200 bg-black relative">
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full h-full object-cover"
              loop
              controls={false}
            />

            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              {isPlaying ? (
                <Pause className="w-12 h-12 text-white" />
              ) : (
                <Play className="w-12 h-12 text-white" />
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Right Testimonials Section */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex flex-col gap-5"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left mb-4 text-[#0A0F2C] leading-snug">
          The SuperSheldon Experience - <span >In Real time</span>
        </h2>

        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02, translateY: -2 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-[6px_6px_15px_rgba(0,0,0,0.2)]"
          >
            <div className="w-16 h-16 flex-shrink-0 rounded-full overflow-hidden">
              <Image
                src={t.image}
                alt={t.name}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-[#0A0F2C] text-lg">{t.name}</h3>
                <div className="flex">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm">{t.testimonial}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
