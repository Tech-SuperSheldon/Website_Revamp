"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import GlossyButton from "../GlossyButton";
import { useOpenDemoBooking } from "../utils/navigation";

const videos = [
  { id: 2, name: "Ms. Aditi", src: "/videos/video2.mp4" },
  { id: 1, name: "Ms. Abha", src: "/videos/video1.mp4" },
];

export default function UKteachtest() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const openDemoBooking = useOpenDemoBooking();

  const currentVideo = videos[currentIndex];

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.muted = false;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleVideoEnd = () => {
    const nextIndex = (currentIndex + 1) % videos.length;
    setCurrentIndex(nextIndex);
    setIsPlaying(false);
  };

  // Reset video when changing index
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.load();
    setIsPlaying(false);
  }, [currentIndex]);

  // IntersectionObserver for auto pause/play
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = videoRef.current;
          if (!video) return;

          if (entry.isIntersecting) {
            if (isPlaying) {
              video.play().catch(() => {});
            }
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.6 }
    );

    observer.observe(videoEl);

    return () => {
      observer.disconnect();
    };
  }, [currentIndex, isPlaying]);

  return (
    <section className="relative flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-20 flex items-center justify-center">
        <div className="w-[60vw] max-w-[700px] aspect-square rounded-full bg-orange-200 opacity-30 blur-3xl" />
      </div>
      <div className="absolute -left-[15vw] top-1/2 -translate-y-1/2 w-[40vw] max-w-[500px] aspect-square rounded-full bg-orange-200 opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute -right-[15vw] top-1/2 -translate-y-1/2 w-[40vw] max-w-[500px] aspect-square rounded-full bg-orange-200 opacity-20 blur-3xl pointer-events-none" />

      {/* Title */}
      <h2 className="text-center font-quicksand font-semibold mb-10 text-[clamp(1.5rem,4vw,3rem)] leading-snug">
        Behind Every Success,
        <br />
        <span className="text-red-400">A Teacher&apos;s Story</span>
      </h2>

      {/* Main Wrapper */}
      <div className="relative flex flex-col md:flex-row items-center justify-center w-full max-w-7xl gap-6">
        {/* Left Info Cards */}
        <div className="flex flex-col gap-4 static md:absolute md:left-[calc(50%+18vw)] md:top-[80px] w-full sm:w-auto items-center md:items-start">
          <div className="bg-white shadow-lg rounded-2xl p-4 w-full max-w-[250px] flex flex-col justify-between font-manrope shadow-gray-500">
            <img src="/pcmouse.png" className="w-10 sm:w-12 h-10 sm:h-12" alt="logo" />
            <div className="mx-auto text-center">
              <h3 className="font-semibold text-lg sm:text-xl">2M+ Questions</h3>
              <p className="text-sm sm:text-base text-gray-600 pb-3">2M+ extra projects</p>
              <GlossyButton
                onClick={openDemoBooking}
                className="bg-orange-500 text-white py-2 px-3 rounded-full hover:bg-orange-600 transition"
              >
                Try a free Class
              </GlossyButton>
            </div>
          </div>
          <div className="bg-white shadow-lg shadow-gray-500 rounded-2xl p-4 sm:p-6 w-full max-w-[220px] flex flex-col justify-center items-center font-manrope">
            <img src="/srch.png" className="w-9 sm:w-11 h-9 sm:h-11 mb-2" alt="logo" />
            <h3 className="font-semibold text-lg">100K+</h3>
            <p className="text-sm text-gray-600">Worldwide Students</p>
          </div>
        </div>

        {/* Center Video */}
        <div className="relative w-[70vw] max-w-[380px] aspect-[9/16] flex items-center justify-center shadow-xl rounded-full">
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl cursor-pointer" onClick={togglePlay}>
            <video
              key={currentVideo.src}
              ref={videoRef}
              src={currentVideo.src}
              className="w-full h-full object-cover"
              onEnded={handleVideoEnd}
              playsInline
              controls={false}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              className="absolute bottom-2 right-2 bg-black/40 p-2 rounded-full"
            >
              {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-sm sm:text-lg font-adamina text-white drop-shadow-lg">
              {currentVideo.name}
            </div>
          </div>
        </div>

        {/* Right Info Cards */}
        <div className="flex flex-col gap-4 static md:absolute md:right-[calc(50%+18vw)] md:top-[100px] w-full sm:w-auto items-center md:items-end">
          <div className="bg-white shadow-lg shadow-gray-500 rounded-2xl p-4 sm:p-6 w-full max-w-[220px] flex flex-col justify-center items-center font-manrope">
            <img src="/msg.png" className="w-10 sm:w-12 h-10 sm:h-12 mb-2" alt="logo" />
            <h3 className="font-semibold text-base sm:text-lg">Future Opportunities</h3>
          </div>
          <div className="bg-white shadow-lg shadow-gray-500 rounded-2xl p-4 w-full max-w-[250px] flex flex-col justify-center items-center font-manrope">
            <img src="/add.png" className="w-12 sm:w-14 h-12 sm:h-14 mb-2" alt="logo" />
            <div className="mx-auto text-center">
              <h3 className="font-semibold text-lg sm:text-xl">MIT Certified +</h3>
              <p className="text-sm sm:text-base text-gray-600 pb-3">All teachers MIT certified</p>
              <GlossyButton
                onClick={openDemoBooking}
                className="bg-orange-500 text-white py-2 px-3 rounded-full hover:bg-orange-600 transition"
              >
                Try a free Class
              </GlossyButton>
            </div>
          </div>
        </div>
      </div>

      {/* Navigator Dots */}
      <div className="flex mt-6 gap-3">
        {videos.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to video ${index + 1}`}
            onClick={() => {
              setCurrentIndex(index);
              setIsPlaying(false);
            }}
            className={`w-3 h-3 rounded-full transition ${index === currentIndex ? "bg-orange-500" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </section>
  );
}
