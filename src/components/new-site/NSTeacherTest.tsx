'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Video, Mic, PhoneOff, Monitor, BookOpen, Users, Code, Atom } from 'lucide-react';

export default function NSTeacherTest() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videos = [
    '/videos/video1.mp4',
    '/videos/video2.mp4'
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play().catch(e => console.log("Autoplay prevented", e));
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
        // Reload video when index changes, but rely on IntersectionObserver for playing
        videoRef.current.load(); 
        // We let the IntersectionObserver handle the play() call if it remains in view
        // But if we just switched video and are already in view, we might need to verify or strictly wait for observer.
        // Actually, if we just load(), the observer callback might not fire again if we don't move.
        // So we can try to play if we know we are intersecting, but simplest is:
        // just load, and if we are visible, the observer *might* not re-trigger right away unless we check visibility.
        // A simple fix: just try to play if the element is visible?
        // Let's just load. The browser will stay in the same position.
    }
  }, [currentVideoIndex]);

  return (
    <section className="w-full py-12 bg-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#FFF4E5] rounded-bl-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gray-50 rounded-tr-[80px] -z-10" />

      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Learn Anytime, Anywhere <br className="hidden md:block" />
            — Unlock <span className="text-[#E8A631]">Your Potential</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mb-6">
            Engaging online lessons designed by expert teachers to help students master every subject.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <button className="px-8 py-3 bg-[#E8A631] text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-[#d6962f] transition-all transform hover:-translate-y-1">
              Start Learning Now
            </button>
            <button className="px-8 py-3 bg-[#FFF4E5] text-[#E8A631] rounded-full font-semibold hover:bg-[#ffeccf] transition-colors">
              Explore Subjects
            </button>
          </div>
        </div>

        {/* Main Content Area - Grid Layout */}
        <div className="relative max-w-7xl mx-auto h-[650px] flex items-center justify-center">
          
          {/* Center Main Video - Portrait (Reels Style) */}
          <div className="relative z-10 w-full max-w-[320px] aspect-[9/16] bg-gray-900 rounded-[32px] overflow-hidden shadow-2xl border-8 border-white transform transition-transform hover:scale-105 duration-500 mx-auto">
            
            <video 
                ref={videoRef}
                className="w-full h-full object-cover cursor-pointer"
                muted={isMuted} // Must be present for autoplay to work initially
                playsInline
                onClick={toggleMute}
                onEnded={handleVideoEnded}
                poster="/new-site/testimonials/video_thumb_ayesha.webp"
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
                    className={`p-3 rounded-full backdrop-blur-md transition-colors ${!isMuted ? 'bg-white/40' : 'bg-white/20 hover:bg-white/30'}`}
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
          <div className="absolute top-[10%] left-4 lg:left-20 bg-white p-3 rounded-2xl shadow-xl w-[220px] transform -rotate-6 hover:rotate-0 transition-transform duration-300 z-20 animate-float-slow hidden md:block">
            <div className="relative w-full h-28 rounded-xl bg-gray-100 overflow-hidden mb-3 group">
                 <div className="absolute inset-0 flex items-center justify-center bg-gray-200 group-hover:bg-[#E8A631]/10 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-[#E8A631] flex items-center justify-center">
                        <Play size={16} fill="white" className="text-white ml-1" />
                    </div>
                 </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">Year 5</span>
                <span className="ml-auto text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded">Math</span>
            </div>
            <h4 className="text-xs font-bold text-gray-900 leading-tight mb-2">
                Mastering Fractions & Decimals
            </h4>
            <button className="w-full py-1.5 bg-[#E8A631] text-white text-xs font-semibold rounded-lg hover:bg-[#d6962f] transition-colors">
                Watch Snippet
            </button>
          </div>

          {/* Card 2: Small (Chemistry) */}
          <div className="absolute top-[60%] left-10 lg:left-32 bg-white p-3 rounded-2xl shadow-xl w-[180px] scale-90 transform rotate-3 hover:rotate-0 transition-transform duration-300 z-10 animate-float-delayed hidden md:block">
             <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold text-purple-500 bg-purple-50 px-2 py-0.5 rounded">Year 9</span>
                <span className="ml-auto text-[10px] bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded">Chem</span>
            </div>
            <div className="relative w-full h-20 rounded-xl bg-gray-100 overflow-hidden mb-2 flex items-center justify-center">
                <Atom size={24} className="text-purple-400" />
            </div>
            <h4 className="text-xs font-bold text-gray-900 leading-tight">
                Periodic Table Basics
            </h4>
          </div>

          {/* --- RIGHT SIDE CARDS --- */}

          {/* Card 3: Big (Physics) */}
          <div className="absolute top-[15%] right-4 lg:right-20 bg-white p-3 rounded-2xl shadow-xl w-[220px] transform rotate-6 hover:rotate-0 transition-transform duration-300 z-20 animate-float-delayed hidden md:block">
            <div className="relative w-full h-28 rounded-xl bg-gray-100 overflow-hidden mb-3 group">
                 <div className="absolute inset-0 flex items-center justify-center bg-gray-200 group-hover:bg-[#E8A631]/10 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-[#E8A631] flex items-center justify-center">
                        <Play size={16} fill="white" className="text-white ml-1" />
                    </div>
                 </div>
            </div>
             <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded">Year 10</span>
                <span className="ml-auto text-[10px] bg-green-100 text-green-600 px-1.5 py-0.5 rounded">Physics</span>
            </div>
            <h4 className="text-xs font-bold text-gray-900 leading-tight mb-2">
                Physics Fundamentals: Motion
            </h4>
            <button className="w-full py-1.5 bg-[#E8A631] text-white text-xs font-semibold rounded-lg hover:bg-[#d6962f] transition-colors">
                Watch Snippet
            </button>
          </div>

          {/* Card 4: Small (Code) */}
          <div className="absolute top-[65%] right-10 lg:right-32 bg-white p-3 rounded-2xl shadow-xl w-[180px] scale-90 transform -rotate-3 hover:rotate-0 transition-transform duration-300 z-10 animate-float-slow hidden md:block">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded">Beginner</span>
                <span className="ml-auto text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">Code</span>
            </div>
            <div className="relative w-full h-20 rounded-xl bg-gray-100 overflow-hidden mb-2 flex items-center justify-center">
                <Code size={24} className="text-blue-400" />
            </div>
            <h4 className="text-xs font-bold text-gray-900 leading-tight">
                Intro to Python
            </h4>
          </div>

        </div>
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
