"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Play } from "lucide-react";

const teachers = [
  {
    id: 1,
    name: "Ashita Gunjikar",
    subject: "Mathematics Teacher",
    image: "/course/Teacher1.png",
    video: "/videos/video1.mp4",
  },
  {
    id: 2,
    name: "",
    subject: "",
    image: "/course/Teacher2.png",
  },
  {
    id: 3,
    name: "Avishikta Dutta",
    subject: "Chemistry Teacher",
    image: "/course/Teacher3.png",
  },
  {
    id: 4,
    name: "",
    subject: "",
    image: "/course/Teacher4.png",
  },
  {
    id: 5,
    name: "",
    subject: "",
    image: "/course/Teacher5.png",
  },
  {
    id: 6,
    name: "",
    subject: "",
    image: "/course/Teacher6.png",
  },
  {
    id: 7,
    name: "",
    subject: "",
    image: "/course/Teacher7.png",
  },
  {
    id: 8,
    name: "",
    subject: "",
    image: "/course/Teacher8.png",
  },
  {
    id: 10,
    name: "Priyanshi Agrawal",
    subject: "AI/ML Python Teacher",
    image: "/course/Teacher10.png",
  },
];

const doubledTeachers = [...teachers, ...teachers, ...teachers, ...teachers];

const CARD_WIDTH = 260;
const CARD_GAP = 30;
const TOTAL_WIDTH = teachers.length * (CARD_WIDTH + CARD_GAP);

export default function NSTeacherCarousel() {
  const [activeVideo, setActiveVideo] = useState(null);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const x = useMotionValue(0);
  const baseVelocity = -0.5;

  useAnimationFrame((t, delta) => {
    let moveBy = baseVelocity * (delta / 16);
    let newX = x.get() + moveBy;
    if (newX <= -TOTAL_WIDTH) {
      newX = 0;
    }
    x.set(newX);
  });

  useEffect(() => {
    if (videoRef.current) {
      const handleEnd = () => setActiveVideo(null);
      videoRef.current.addEventListener("ended", handleEnd);
      return () => {
        videoRef.current?.removeEventListener("ended", handleEnd);
      };
    }
  }, [activeVideo]);

  return (
    <section className="relative w-full py-20 overflow-hidden bg-white">
      <div className="mb-8 text-center relative z-10">
        <h2 className="text-3xl font-bold text-gray-900 font-quicksand">
          Meet Our <span className="text-orange-500">Teachers</span>
        </h2>
      </div>

      <div ref={containerRef} className="relative flex justify-center w-full h-[450px] items-center overflow-hidden">
        
        {/* Top Ellipse Overlay */}
        <div className="absolute top-[-50px] left-0 w-full h-[100px] bg-white z-20" 
             style={{ borderRadius: "0 0 50% 50%" }}></div>

        {/* Carousel Content */}
        <div className="relative w-full max-w-7xl h-full flex items-center">
          {doubledTeachers.map((teacher, index) => {
            return (
              <Card
                key={index}
                item={teacher}
                index={index}
                x={x}
                onClick={() => teacher.video && setActiveVideo(teacher.video)}
              />
            );
          })}
        </div>

        {/* Bottom Ellipse Overlay */}
        <div className="absolute bottom-[-50px] left-0 w-full h-[100px] bg-white z-20" 
             style={{ borderRadius: "50% 50% 0 0" }}></div>

      </div>

      {activeVideo && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/80 z-[100]"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative bg-black rounded-2xl shadow-lg overflow-hidden"
            style={{
              width: "min(90vw, 360px)",
              aspectRatio: "9/16",
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (videoRef.current) {
                videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
              }
            }}
          >
            <video
              ref={videoRef}
              src={activeVideo}
              className="w-full h-full object-cover"
              playsInline
              autoPlay
              controls={false}
            />
          </div>
        </div>
      )}
    </section>
  );
}

function Card({ item, index, x, onClick }: { item: any, index: number, x: any, onClick: () => void }) {
  const cardWidth = CARD_WIDTH + CARD_GAP;
  const initialOffset = index * cardWidth;

  const xPos = useTransform(x, (latestX: number) => {
    return initialOffset + latestX;
  });

  return (
    <motion.div
      style={{
        position: "absolute",
        left: 0,
        height: "100%",
        width: CARD_WIDTH,
        x: xPos,
      }}
      className="flex flex-col items-center justify-center cursor-pointer will-change-transform"
      onClick={onClick}
    >
      <div className="relative w-full h-[360px] rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-gray-100 group">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4 text-white">
          {item.name && (
            <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
          )}
          {item.subject && (
            <p className="text-xs text-gray-300">{item.subject}</p>
          )}
        </div>

        {item.video && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
              <Play className="text-white fill-white" size={24} />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
