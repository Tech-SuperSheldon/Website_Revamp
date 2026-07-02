"use client"
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import GridBackground from "@/components/new-site/GridBackground";
import { assetUrl } from "@/lib/assetUrl";




// Reusing content from Studentvideo.jsx
const infoCards = [
  {
    id: 1,
    title: "1:1 Sessions",
    icon: "/Sketches _ Call to action.gif",
    description: "Personalized attention to ensure every concept is clearly understood.",
  },
  {
    id: 2,
    title: "Live Recorded Classes",
    icon: "/Sketches _ Flow chart.gif",
    description: "Revisit lessons anytime to reinforce learning at your own pace.",
  },
  {
    id: 3,
    title: "Homework & Tests",
    icon: "/Sketches _ Process optimisation.gif",
    description: "Regular practice to track progress and master new skills effectively.",
  },
];

export default function NSClassVideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    void video.play().catch(() => {});
  }, []);

  // Auto-play attempt on scroll (muted required for autoplay)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setIsMuted(video.muted);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.muted = true;
            video
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => {
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
    <section ref={containerRef} className="relative w-full pt-4 md:pt-8 pb-8 md:pb-20 overflow-hidden">
      {/* Background Decor Removed */}
      
      {/* --- BACKGROUND ANIMATED TEXT --- */}
      {/* "OUR" - Top Left relative to content area */}
      <motion.div 
        style={{ x: leftTextX, opacity: textOpacity }}
        className="absolute top-[20%] md:top-[25%] left-0 md:left-[10%] pointer-events-none select-none z-0 overflow-hidden hidden md:block"
      >
          <h1 className="text-[9.23vw] md:text-[6.15rem] font-bold text-gray-500 tracking-tighter whitespace-nowrap">
            OUR
          </h1>
      </motion.div>

      {/* "CLASS" - Bottom Right relative to content area */}
      <motion.div 
        style={{ x: rightTextX, opacity: textOpacity }}
        className="absolute bottom-[20%] md:bottom-[32%] right-0 md:right-[10%] pointer-events-none select-none z-0 overflow-hidden hidden md:block"
      >
          <h1 className="text-[9.23vw] md:text-[6.15rem] font-bold text-gray-500 tracking-tighter whitespace-nowrap">
            CLASS
          </h1>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center gap-8 md:gap-12">
        
        {/* --- HEADER TITLE --- */}
        <div className="text-center max-w-2xl mt-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            Experience the <span className="text-orange-500">Classroom</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-lg hidden md:block" // Hidden on mobile to save space if needed, or keep it
          >
            See how our interactive platform makes learning engaging.
          </motion.p>
        </div>
        
        {/* --- TABLET CONTAINER --- */}
        <div className="relative w-full max-w-[1000px] aspect-[16/10] md:aspect-[16/9] flex items-center justify-center mt-4 mb-4 md:mb-12">
            
            {/* THE DEVICE (TABLET) */}
            <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                whileInView={{ scale: 1, opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
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
                        src={assetUrl("/studentvid.mp4")}
                        poster={assetUrl("/thumbnail.png")}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
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
        {/* --- BOTTOM 3-COLUMN INFO SECTION --- */}


        {/* --- BOTTOM 3-COLUMN INFO SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-6xl mt-4 md:mt-12 px-4 relative">
            <GridBackground zIndex={0} cellSize={36} lineColor="rgba(0,0,0,0.09)" fadeRadius="60%" />
            {/* Item 1 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-center text-center group"
            >
                <div className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-3xl bg-white flex items-center justify-center shadow-xl shadow-orange-100/40 transition-transform group-hover:scale-105 duration-300 overflow-hidden">
                     <img src={infoCards[0].icon} alt="1:1 Sessions" className="object-contain w-full h-full" />
                </div>
            </motion.div>

            {/* Separator 1 (Hidden on mobile) */}
             <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent absolute left-1/3 h-48 mt-4" />

            {/* Item 2 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center text-center group"
            >
                <div className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-3xl bg-white flex items-center justify-center shadow-xl shadow-orange-100/40 transition-transform group-hover:scale-105 duration-300 overflow-hidden">
                    <img src={infoCards[1].icon} alt="Live Recorded Classes" className="object-contain w-full h-full" />
                </div>
            </motion.div>

            {/* Separator 2 (Hidden on mobile) */}
            <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent absolute right-1/3 h-48 mt-4" />

            {/* Item 3 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center text-center group"
            >
                <div className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-3xl bg-white flex items-center justify-center shadow-xl shadow-orange-100/40 transition-transform group-hover:scale-105 duration-300 overflow-hidden">
                    <img src={infoCards[2].icon} alt="Homework & Tests" className="object-contain w-full h-full" />
                </div>
            </motion.div>
        </div>

      </div>
    </section>
  );
}