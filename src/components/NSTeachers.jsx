
"use client"
import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Play } from "lucide-react";

const teachers = [
  {
    id: 1,
    name: "Ashita Gunjikar",
    subject: "Mathematics Teacher",
    image: "/course/Teacher1.png",
    // video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 2,
    name: "",
    subject: "",
    image: "/course/Teacher2.png",
    // video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 3,
    name: "Avishikta Dutta",
    subject: "Chemistry Teacher",
    image: "/course/Teacher3.png",
    // video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 4,
    name: "",
    subject: "",
    image: "/course/Teacher4.png",
    // video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 5,
    name: "",
    subject: "",
    image: "/course/Teacher5.png",
    // video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 6,
    name: "",
    subject: "",
    image: "/course/Teacher6.png",
    // video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 7,
    name: "",
    subject: "",
    image: "/course/Teacher7.png",
    // video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 8,
    name: "",
    subject: "",
    image: "/course/Teacher8.png",
    // video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  // {
  //   id: 9,
  //   name: "Kavita Rao",
  //   subject: "SAT Exam Teacher",
  //   image: "/course/Teacher9.png",
  //   // video: "https://www.w3schools.com/html/mov_bbb.mp4",
  // },
  {
    id: 10,
    name: "Priyanshi Agrawal",
    subject: "AI/ML Python Teacher",
    image: "/course/Teacher10.png",
    // video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
];

export default function TeacherCarousel() {
  const [activeVideo, setActiveVideo] = useState(null);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      void controls.start({
        x: ["0%", "-100%"],
        transition: { repeat: Infinity, duration: 40, ease: "linear" },
      });
    } else {
      controls.stop();
    }
  }, [isInView, controls]);

  // Close popup when video ends
  useEffect(() => {
    if (videoRef.current) {
      const handleEnd = () => setActiveVideo(null);
      videoRef.current.addEventListener("ended", handleEnd);
      return () => {
        videoRef.current?.removeEventListener("ended", handleEnd);
      };
    }
  }, [activeVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    void video.play().catch(() => {});
  }, [activeVideo]);

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
      <motion.div
        className="flex gap-6"
        animate={controls}
      >
        {[...teachers, ...teachers].map((teacher, index) => (
          <div
            key={index}
            className="relative min-w-[170px] md:min-w-[220px] rounded-2xl shadow-md overflow-hidden bg-white cursor-pointer transition duration-500 hover:shadow-md hover:shadow-gray-500 hover:scale-105"
            onClick={() => setActiveVideo(teacher.video)}
          >
            <img
              src={teacher.image}
              alt={teacher.name}
              className="w-full h-44 md:h-60 object-cover"
            />

            {/* Overlay */}
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
              <p className="font-semibold text-lg md:text-[23px]">{teacher.name}</p>
              <p className="text-sm">{teacher.subject}</p>
              {/* <button
                aria-label={`Play video of ${teacher.name}`}
                className="absolute bottom-3 right-3 p-2 bg-blue-600 rounded-full"
                onClick={(e) => {
                  e.stopPropagation(); // prevent triggering card click
                  setActiveVideo(teacher.video);
                }}
              >
                <Play size={18} />
              </button> */}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Video Popup */}
      {activeVideo && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
          onClick={() => setActiveVideo(null)} // click outside closes popup
        >
          <div
            className="relative bg-black rounded-2xl shadow-lg overflow-hidden"
            style={{
              width: "min(90vw, 360px)", // Instagram reel size
              aspectRatio: "9/16",
            }}
            onClick={(e) => {
              e.stopPropagation(); // prevent outside click from closing
              if (videoRef.current) {
                if (videoRef.current.paused) {
                  videoRef.current.play();
                } else {
                  videoRef.current.pause();
                }
              }
            }}
          >
            <video
              ref={videoRef}
              src={activeVideo}
              className="w-full h-full object-cover"
              playsInline
              autoPlay
              muted
              preload="none"
              controls={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}