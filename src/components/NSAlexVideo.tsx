"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { assetUrl } from "@/lib/assetUrl";

export default function TestimonialVideoBoost() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Default to true for autoplay compliance



  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    void v.play().catch(() => {});
  }, []);

  // 1. Handle Viewport Autoplay (Must be muted to work)
  useEffect(() => {
    const v = videoRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            target.muted = true;
            target.play().catch((e) => console.log("Autoplay prevented:", e));
          } else {
            target.pause();
          }
        });
      },
      { threshold: 0.3 } // Trigger slightly earlier for better UX
    );

    if (v) observer.observe(v);

    return () => {
      if (v) observer.unobserve(v);
    };
  }, []);

  // 2. Unified Toggle Function
  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;

    if (v.paused) {
      v.play();
      // If user manually plays, we can likely unmute (optional choice)
      v.muted = false;
      setIsMuted(false);
    } else {
      v.pause();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the play toggle
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };


  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full overflow-hidden -mt-[28vh] pt-2 pb-6 md:mt-0 md:py-12 flex justify-center"
    >
      <div className="relative w-full max-w-6xl rounded-3xl p-6 md:p-12 mx-4 md:mx-8 flex flex-col items-center justify-center">
        
        {/* Background Image */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden z-0">
          <Image
            src="/UK/bgsuccess.png"
            alt="Background Pattern"
            fill
            className="object-cover object-center opacity-70"
            priority
          />
        </div>

        {/* Content Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 flex flex-col md:flex-row items-start justify-between w-full"
        >
          
          {/* LEFT TEXT */}
          <div className="md:w-1/2 space-y-6 text-center md:text-left px-2 md:px-4 mb-8 md:mb-0 md:pt-4 flex flex-col justify-center">
            <div>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[#4338CA] font-semibold text-sm md:text-base mb-6"
              >
                Why SuperSheldon
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight"
              >
                Ace Your Exams with SuperSheldon: A Student&apos;s Story
              </motion.h2>
            </div>
            
            {/* Static Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 md:mt-10 rounded-2xl overflow-hidden shadow-xl border border-gray-100 relative aspect-video w-full max-w-lg mx-auto md:mx-0 bg-gray-100 group"
            >
              <Image
                src="/alexphoto.png"
                alt="Alex - SuperSheldon Success Story"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>
          </div>

          {/* RIGHT: Video — dramatic perspective entrance + subtle float */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotateX: 20, scale: 0.88 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1000, transformStyle: "preserve-3d" }}
            className="relative md:w-1/2 flex justify-center items-center mt-8 md:mt-0"
          >
            {/* ── CSS Phone Frame — wrapped in floating motion ── */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex justify-center items-center scale-75 md:scale-100"
            >
              {/* Phone outer shell */}
              <div
                className="relative bg-[#1a1a1a] rounded-[44px] p-[10px] shadow-[0_0_0_1px_#3a3a3a,0_30px_80px_rgba(0,0,0,0.45),inset_0_0_0_1px_#444]"
                style={{
                  width: 300,
                  height: 600,
                }}
              >
                {/* Volume buttons (left) */}
                <div style={{ position: "absolute", left: -5, top: 100, width: 4, height: 32, background: "#3a3a3a", borderRadius: 3 }} />
                <div style={{ position: "absolute", left: -5, top: 142, width: 4, height: 48, background: "#3a3a3a", borderRadius: 3 }} />
                <div style={{ position: "absolute", left: -5, top: 200, width: 4, height: 48, background: "#3a3a3a", borderRadius: 3 }} />
                {/* Power button (right) */}
                <div style={{ position: "absolute", right: -5, top: 150, width: 4, height: 60, background: "#3a3a3a", borderRadius: 3 }} />

                {/* Screen bezel */}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "#000",
                    borderRadius: 36,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {/* Notch */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 100,
                      height: 26,
                      background: "#1a1a1a",
                      borderRadius: "0 0 20px 20px",
                      zIndex: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                    }}
                  >
                    {/* Front camera dot */}
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#2a2a2a", border: "1px solid #444" }} />
                    {/* Speaker pill */}
                    <div style={{ width: 36, height: 5, borderRadius: 3, background: "#2a2a2a" }} />
                  </div>

                  {/* Video fills the screen */}
                  <video
                    ref={videoRef}
                    src={assetUrl("/alextestimonial.mp4")}
                    className="w-full h-full object-cover"
                    playsInline
                    autoPlay
                    loop
                    muted
                    preload="auto"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onVolumeChange={() => {
                       if(videoRef.current) setIsMuted(videoRef.current.muted)
                    }}
                    onClick={togglePlay}
                  />

                  {/* Controls Overlay */}
                  <div className="absolute bottom-4 right-3 flex gap-2 z-30">
                    <button
                      onClick={toggleMute}
                      className="bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-2 transition-all duration-200"
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 text-white" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-white" />
                      )}
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                      className="bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-2 transition-all duration-200 shadow-md"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 text-black" />
                      ) : (
                        <Play className="w-4 h-4 text-black ml-0.5" />
                      )}
                    </button>
                  </div>

                  {/* Home indicator bar */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 8,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 80,
                      height: 4,
                      borderRadius: 2,
                      background: "rgba(255,255,255,0.4)",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </motion.section>
  );
}