"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
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

const CARD_WIDTH_DEFAULT = 288;
const CARD_GAP = 24;

export default function NSTeacherCarousel() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [cardWidth, setCardWidth] = useState(CARD_WIDTH_DEFAULT);
  const [isDragging, setIsDragging] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const dragging = useRef(false);
  const lastPointerX = useRef(0);
  const dragStartX = useRef(0);

  useEffect(() => {
    const update = () => {
      setCardWidth(Math.min(CARD_WIDTH_DEFAULT, window.innerWidth - 48));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const totalWidth = teachers.length * (cardWidth + CARD_GAP);

  const x = useMotionValue(0);
  const baseVelocity = -0.5;

  useAnimationFrame((t, delta) => {
    if (dragging.current) return;
    let moveBy = baseVelocity * (delta / 16);
    let newX = x.get() + moveBy;
    if (newX <= -totalWidth) newX = 0;
    if (newX > 0) newX = -totalWidth;
    x.set(newX);
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    setIsDragging(true);
    lastPointerX.current = e.clientX;
    dragStartX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const delta = e.clientX - lastPointerX.current;
    lastPointerX.current = e.clientX;
    let newX = x.get() + delta;
    if (newX <= -totalWidth) newX = newX + totalWidth;
    if (newX > 0) newX = newX - totalWidth;
    x.set(newX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    dragging.current = false;
    setIsDragging(false);
  };

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
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900">
          Meet Our <span className="bg-[#E66E37] text-white px-3 py-1 rounded-[14px]">Teachers</span>
        </h2>
      </div>

      <div
        ref={containerRef}
        className={`relative flex justify-center w-full h-[280px] sm:h-[360px] md:h-[400px] items-center overflow-hidden select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Carousel Content */}
        <div className="relative w-full max-w-7xl h-full flex items-center">
          {doubledTeachers.map((teacher, index) => {
            return (
              <Card
                key={index}
                item={teacher}
                index={index}
                x={x}
                cardWidth={cardWidth}
                dragStartX={dragStartX}
                onClick={() => teacher.video && setActiveVideo(teacher.video)}
              />
            );
          })}
        </div>

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

function Card({ item, index, x, cardWidth, dragStartX, onClick }: { item: any, index: number, x: any, cardWidth: number, dragStartX: React.MutableRefObject<number>, onClick: () => void }) {
  const stride = cardWidth + CARD_GAP;
  const initialOffset = index * stride;

  const xPos = useTransform(x, (latestX: number) => {
    return initialOffset + latestX;
  });

  const handleClick = (e: React.MouseEvent) => {
    // Suppress click if the pointer moved more than 6px (it was a drag, not a tap)
    if (Math.abs(e.clientX - dragStartX.current) > 6) return;
    onClick();
  };

  return (
    <motion.div
      style={{
        position: "absolute",
        left: 0,
        height: "100%",
        width: cardWidth,
        x: xPos,
      }}
      className="flex flex-col items-center justify-center will-change-transform"
      onClick={handleClick}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white bg-gray-100 group">
        <Image
          src={item.image}
          alt={item.name || "Teacher profile"}
          fill
          sizes="(max-width: 768px) 100vw, 288px"
          className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
            item.name
              ? "object-cover object-top"
              : "object-contain object-center sm:object-cover sm:object-top"
          }`}
        />

        {(item.name || item.subject) && (
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
            {item.name && (
              <h3 className="font-bold text-lg sm:text-2xl leading-tight text-white">{item.name}</h3>
            )}
            {item.subject && (
              <p className="text-sm sm:text-base text-gray-200">{item.subject}</p>
            )}
          </div>
        )}

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
