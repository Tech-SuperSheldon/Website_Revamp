"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Video, Mic, PhoneOff, Monitor, BookOpen, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { assetUrl } from "@/lib/assetUrl";

export default function NSTeacherTest() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videos = [
    assetUrl("/videos/video1.mp4"),
    assetUrl("/videos/video2.mp4")
  ];

  const handleVideoEnded = () => {
    const nextIndex = (currentVideoIndex + 1) % videos.length;
    setCurrentVideoIndex(nextIndex);
  };

  const toggleMute = () => {
    if (videoRef.current) {
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    void video.play().catch(() => {});
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play().catch(() => {});
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.5 } // Play when 50% visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.defaultMuted = true;
        videoRef.current.playsInline = true;
        setIsMuted(true);
        if (isVisible) {
            void videoRef.current.play().catch(() => {});
        }
    }
  }, [currentVideoIndex, isVisible]);

  return (
    <section className="w-full py-4 md:py-12 overflow-hidden relative">
      {/* Background decoration removed */}

      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto mb-4 md:mb-10"
        >
          <h2 className="text-2xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight">
            Learn Anytime, Anywhere <br className="hidden md:block" />
            — Unlock <span className="text-[#e87f1e]">Your Potential</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mb-6">
            Engaging online lessons designed by expert teachers to help students master every subject.
          </p>
          
          <div className="flex items-center justify-center gap-3 md:gap-4">
            <Link href="/demo">
              <button className="px-6 md:px-8 py-2 md:py-3 bg-[#e87f1e] text-white rounded-full font-semibold shadow-lg hover:shadow-orange-500/30 hover:bg-[#d67015] transition-all transform hover:-translate-y-1 text-sm md:text-base">
                Try a free class
              </button>
            </Link>
            <Link href="/courses">
                <button className="px-6 md:px-8 py-2 md:py-3 bg-orange-50 text-[#e87f1e] border-2 border-orange-100 rounded-full font-semibold hover:bg-orange-100 transition-colors text-sm md:text-base">
                Explore Subjects
                </button>
            </Link>
          </div>
        </motion.div>

        {/* Main Content Area - Grid Layout */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative max-w-7xl mx-auto h-[520px] md:h-[650px] flex items-center justify-center"
        >
          
          {/* Center Main Video - Portrait (Reels Style) */}
          <div className="relative z-10 w-full max-w-[280px] md:max-w-[320px] aspect-[9/16] bg-gray-900 rounded-[32px] overflow-hidden shadow-2xl border-8 border-white ring-4 ring-orange-100 transform transition-transform hover:scale-105 duration-500 mx-auto">
            
            <video 
                ref={videoRef}
                className="w-full h-full object-cover cursor-pointer"
                muted={isMuted}
                autoPlay
                playsInline
                preload="none"
                onClick={toggleMute}
                onEnded={handleVideoEnded}
                poster={assetUrl("/new-site/testimonials/video_thumb_ayesha.png")}
            >
                <source src={videos[currentVideoIndex]} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Sound Indicator Overlay */}
            <div className="absolute top-4 right-4 z-20">
                <button 
                    onClick={toggleMute}
                    className="p-2 rounded-full bg-black/50 backdrop-blur-md hover:bg-black/70 transition-colors"
                >
                    {isMuted ? (
                        <div className="relative">
                           <Mic size={16} className="text-white opacity-50" />
                           <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-500 rotate-45 transform -translate-y-1/2" />
                        </div>
                    ) : (
                        <Mic size={16} className="text-white" />
                    )}
                </button>
            </div>

            {/* Video Controls Overlay */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-4">
                <button className="p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors">
                    <Monitor size={20} className="text-white" />
                </button>
                <button className="p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors">
                    <Video size={20} className="text-white" />
                </button>
                <button 
                    className={`p-3 rounded-full backdrop-blur-md transition-colors ${!isMuted ? "bg-white/40" : "bg-white/20 hover:bg-white/30"}`}
                    onClick={toggleMute}
                >
                    <Mic size={20} className="text-white" />
                </button>
                <button className="p-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors shadow-lg">
                    <PhoneOff size={20} className="text-white" />
                </button>
            </div>
          </div>

          {/* --- LEFT SIDE CARDS --- */}

          {/* Card 1: Big (Math) */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotate: -6 }}
            whileInView={{ opacity: 1, x: 0, rotate: -6 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            whileHover={{ rotate: 0, transition: { duration: 0.3 } }}
            className="absolute top-[10%] left-4 lg:left-20 bg-white p-3 rounded-2xl shadow-xl w-[220px] z-20 animate-float-slow hidden md:block cursor-pointer"
          >
            {/* Teacher photo */}
            <div className="relative w-full h-28 rounded-xl overflow-hidden mb-3 bg-gray-50">
              <Image src="/course/Teacher1.png" alt="Ashita Gunjikar" fill sizes="(max-width: 768px) 80px, 220px" className="object-contain" />
            </div>
            <div className="flex items-center gap-2 mb-2">
                <span className="text-[8px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded">Grade 5</span>
                <span className="ml-auto text-[8px] bg-orange-50 text-[#e87f1e] px-1.5 py-0.5 rounded border border-orange-100">Math</span>
            </div>
            <h4 className="text-xs font-bold text-gray-900 leading-tight mb-2">
                Mastering Fractions &amp; Decimals
            </h4>
            <Link href="/demo">
              <button className="w-full py-1.5 bg-[#e87f1e] text-white text-xs font-semibold rounded-lg hover:bg-[#d67015] transition-colors shadow-sm">
                  Try a free class
              </button>
            </Link>
          </motion.div>

          {/* Card 2: Small (Chemistry) */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotate: 3 }}
            whileInView={{ opacity: 1, x: 0, rotate: 3 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            whileHover={{ rotate: 0, transition: { duration: 0.3 } }}
            className="absolute top-[60%] left-10 lg:left-32 bg-white p-3 rounded-2xl shadow-xl w-[180px] scale-90 z-10 animate-float-delayed hidden md:block cursor-pointer"
          >
             <div className="flex items-center gap-2 mb-2">
                <span className="text-[8px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded">Grade 9</span>
                <span className="ml-auto text-[8px] bg-orange-50 text-[#e87f1e] px-1.5 py-0.5 rounded border border-orange-100">Chem</span>
            </div>
            <div className="relative w-full h-20 rounded-xl overflow-hidden mb-2 bg-gray-50">
                <Image src="/course/Teacher3.png" alt="Avishikta Dutta" fill sizes="(max-width: 768px) 80px, 180px" className="object-contain" />
            </div>
            <h4 className="text-xs font-bold text-gray-900 leading-tight">
                Periodic Table Basics
            </h4>
          </motion.div>

          {/* --- RIGHT SIDE CARDS --- */}

          {/* Card 3: Big (Physics) */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotate: 6 }}
            whileInView={{ opacity: 1, x: 0, rotate: 6 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            whileHover={{ rotate: 0, transition: { duration: 0.3 } }}
            className="absolute top-[15%] right-4 lg:right-20 bg-white p-3 rounded-2xl shadow-xl w-[220px] z-20 animate-float-delayed hidden md:block cursor-pointer"
          >
            {/* Teacher photo */}
            <div className="relative w-full h-28 rounded-xl overflow-hidden mb-3 bg-gray-50">
              <Image src="/course/Teacher5.png" alt="Priya Sharma" fill sizes="(max-width: 768px) 80px, 220px" className="object-contain" />
            </div>
            <div className="flex items-center gap-2 mb-2">
                <span className="text-[8px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded">Grade 10</span>
                <span className="ml-auto text-[8px] bg-orange-50 text-[#e87f1e] px-1.5 py-0.5 rounded border border-orange-100">Physics</span>
            </div>
            <h4 className="text-xs font-bold text-gray-900 leading-tight mb-2">
                Physics Fundamentals: Motion
            </h4>
            <Link href="/demo">
              <button className="w-full py-1.5 bg-[#e87f1e] text-white text-xs font-semibold rounded-lg hover:bg-[#d67015] transition-colors shadow-sm">
                  Try a free class
              </button>
            </Link>
          </motion.div>

          {/* Card 4: Small (Code) */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotate: -3 }}
            whileInView={{ opacity: 1, x: 0, rotate: -3 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            whileHover={{ rotate: 0, transition: { duration: 0.3 } }}
            className="absolute top-[65%] right-10 lg:right-32 bg-white p-3 rounded-2xl shadow-xl w-[180px] scale-90 z-10 animate-float-slow hidden md:block cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-2">
                <span className="text-[8px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded">Year 4</span>
                <span className="ml-auto text-[8px] bg-orange-50 text-[#e87f1e] px-1.5 py-0.5 rounded border border-orange-100">English</span>
            </div>
            <div className="relative w-full h-20 rounded-xl overflow-hidden mb-2 bg-gray-50">
                <Image src="/course/Teacher10.png" alt="Priyanshi Agrawal" fill sizes="(max-width: 768px) 80px, 180px" className="object-contain" />
            </div>
            <h4 className="text-xs font-bold text-gray-900 leading-tight">
                Reading Comprehension
            </h4>
          </motion.div>

        </motion.div>
      </div>
      
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(-6deg); }
          50% { transform: translateY(-10px) rotate(-6deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(6deg); }
          50% { transform: translateY(-10px) rotate(6deg); }
        }
        .animate-float-slow {
            animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-delayed {
            animation: float-delayed 7s ease-in-out infinite 1s;
        }
      `}</style>
    </section>
  );
}
