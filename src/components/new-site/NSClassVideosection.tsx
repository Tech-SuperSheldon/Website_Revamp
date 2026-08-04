"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";

// Reusing content from Studentvideo.jsx
const infoCards = [
  {
    id: 1,
    title: "1:1 Sessions",
    icon: "/3column/1.gif",
  },
  {
    id: 2,
    title: "Live Recorded Classes",
    icon: "/3column/2.gif",
  },
  {
    id: 3,
    title: "Homework and tests",
    icon: "/3column/3.gif",
  },
];

export default function NSClassVideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Default to unmuted as requested ("unmute it")
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax Text Animations
  // Text starts near the device and moves OUTWARD as user scrolls down
  const leftTextX = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const rightTextX = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  // Keep opacity simple: fade in as it enters, fade out as it leaves
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, 1, 0]);

  // Toggle play/pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch((e) => console.error("Play failed:", e));
      setIsPlaying(true);
    }
  };
  
  const toggleMute = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!videoRef.current) return;
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
  }

  // Auto-play attempt on scroll
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check actual video muted state
    setIsMuted(video.muted);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Attempt autoplay
            // Note: Unmuted autoplay is often blocked by browsers.
            video.play()
                .then(() => setIsPlaying(true))
                .catch(() => {
                    // Fail silently or show play button
                    setIsPlaying(false);
                });
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.6 }
    );

    observer.observe(video);
    return () => observer.unobserve(video);
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-12 md:py-20 overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-slate-50/50 to-white -z-10" />

      {/* --- BACKGROUND ANIMATED TEXT --- */}
      {/* "OUR" - Top Left relative to content area */}
      <motion.div 
        style={{ x: leftTextX, opacity: textOpacity }}
        className="absolute top-[20%] md:top-[25%] left-0 md:left-[10%] pointer-events-none select-none z-0 overflow-hidden"
      >
          <h1 className="text-[12vw] md:text-[8rem] font-bold text-slate-100/90 tracking-tighter whitespace-nowrap">
            OUR
          </h1>
      </motion.div>

      {/* "CLASS" - Bottom Right relative to content area */}
      <motion.div 
        style={{ x: rightTextX, opacity: textOpacity }}
        className="absolute bottom-[20%] md:bottom-[25%] right-0 md:right-[10%] pointer-events-none select-none z-0 overflow-hidden"
      >
          <h1 className="text-[12vw] md:text-[8rem] font-bold text-slate-100/90 tracking-tighter whitespace-nowrap">
            CLASS
          </h1>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center gap-8 md:gap-12">
        
        {/* --- HEADER TITLE --- */}
        <div className="text-center max-w-2xl mt-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            Experience the <span className="text-orange-500">Classroom</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-lg hidden md:block" // Hidden on mobile to save space if needed, or keep it
          >
            See how our interactive platform makes learning engaging.
          </motion.p>
        </div>
        
        {/* --- TABLET CONTAINER --- */}
        <div className="relative w-full max-w-[1000px] aspect-[16/10] md:aspect-[16/9] flex items-center justify-center mt-4 mb-12">
            
            {/* THE DEVICE (TABLET) */}
            <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                whileInView={{ scale: 1, opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-[95%] h-[95%] md:w-[90%] md:h-[90%] bg-slate-900 rounded-[20px] md:rounded-[48px] shadow-2xl border-[6px] md:border-[12px] border-slate-900 overflow-hidden ring-4 ring-black/5"
            >
                {/* Camera Notch (Landscape) */}
                <div className="absolute top-1/2 right-3 md:right-4 transform -translate-y-1/2 w-1 md:w-1.5 h-12 md:h-16 bg-slate-800/80 rounded-full z-20 hidden md:block" />
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-slate-800/80 rounded-full z-20 md:hidden" />

                {/* Video */}
                <div className="relative w-full h-full bg-slate-800">
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        src="/studentvid-compressed.mp4"
                        poster="/thumbnail.webp"
                        playsInline
                        // Intentionally NOT muted by default prop to "unmute it", 
                        // but autoplay policy might require user interaction.
                    />
                    
                    {/* Overlay Controls */}
                    <div 
                        className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center group cursor-pointer" 
                        onClick={togglePlay}
                    >
                        {/* Play Button (Only visible when paused or hovering) */}
                        <motion.div 
                             initial={false}
                             animate={{ scale: isPlaying ? 0 : 1, opacity: isPlaying ? 0 : 1 }}
                             whileHover={{ scale: 1.1, opacity: 1 }}
                             className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-lg"
                        >
                             {isPlaying ? (
                                <Pause className="w-6 h-6 md:w-8 md:h-8 text-white fill-white" />
                             ) : (
                                <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-white ml-1" />
                             )}
                        </motion.div>

                        {/* Mute Button (Bottom Right) */}
                        <button 
                            onClick={toggleMute}
                            className="absolute bottom-6 right-6 p-3 bg-black/40 backdrop-blur-md rounded-full text-white/90 hover:bg-black/60 transition-colors z-30"
                        >
                            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>

        {/* --- BOTTOM GLASS INFO CARDS --- */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 w-full max-w-5xl">
            {infoCards.map((card) => (
                <div 
                    key={card.id}
                    className="flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-white/60 backdrop-blur-xl border border-white/40 shadow-sm rounded-full transition-transform hover:scale-105"
                >
                    <div className="w-8 h-8 md:w-10 md:h-10 relative flex-shrink-0">
                         <Image src={card.icon} alt={card.title} fill className="object-contain" unoptimized />
                    </div>
                    <span className="text-sm md:text-base font-semibold text-slate-800 tracking-tight">
                        {card.title}
                    </span>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
}