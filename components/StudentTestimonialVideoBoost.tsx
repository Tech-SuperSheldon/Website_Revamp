

// "use client";

// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import { Play, Pause } from "lucide-react";

// export default function TestimonialVideoBoost() {
//   const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   // Chrome autoplay unlock and ensure sound is not muted
//   useEffect(() => {
//     const v = videoRef.current;
//     if (v) {
//       v.muted = false; // Unmute the video
//       v.playsInline = true; // Ensures the video plays inline on mobile devices
//       v.play().catch(() => {});
//       setIsPlaying(true); // Set the state to 'playing'
//     }
//   }, []);

//   // Auto play/pause based on viewport visibility
//   useEffect(() => {
//     const v = videoRef.current;
//     if (!v) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             v.play().catch(() => {});
//             setIsPlaying(true);
//           } else {
//             v.pause();
//             setIsPlaying(false);
//           }
//         });
//       },
//       { threshold: 0.4 }
//     );

//     observer.observe(v);
//     return () => observer.unobserve(v);
//   }, []);

//   // Manual play/pause toggle
//   const togglePlay = () => {
//     const v = videoRef.current;
//     if (!v) return;

//     if (isPlaying) {
//       v.pause();
//       setIsPlaying(false);
//     } else {
//       v.play().catch(() => {});
//       setIsPlaying(true);
//     }
//   };

//   // Play/pause on video click
//   const handleVideoClick = () => {
//     const v = videoRef.current;
//     if (!v) return;

//     if (isPlaying) {
//       v.pause();
//       setIsPlaying(false);
//     } else {
//       v.play().catch(() => {});
//       setIsPlaying(true);
//     }
//   };

//   return (
//     <section className="relative w-full overflow-hidden py-12 md:py-24 flex justify-center">
//       {/* Outer Box */}
//       <div className="relative w-full max-w-6xl bg-[#F5F5F5] rounded-3xl p-6 md:p-12 mx-4 md:mx-8 flex flex-col items-center justify-center">

//         {/* Background Image */}
//         <div className="absolute inset-0 rounded-3xl overflow-hidden">
//           <Image
//             src="/UK/bgsuccess.png"
//             alt="Background Pattern"
//             fill
//             className="object-cover object-center opacity-70"
//             priority
//           />
//         </div>

//         {/* Content Layout */}
//         <div className="relative flex flex-col md:flex-row items-center justify-between w-full">

//           {/* LEFT TEXT */}
//           <div className="md:w-1/2 space-y-6 text-center md:text-left px-2 md:px-4">
//             <p className="text-[#4338CA] font-semibold text-sm md:text-base">
//               Why Super Sheldon
//             </p>

//             <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
//               Ace Your Exams with Super Sheldon: A Student's Story
//             </h2>
//           </div>

//           {/* RIGHT: Slightly Larger Video */}
//           <div className="relative md:w-1/2 flex justify-center items-center mt-16 md:mt-0">
//             <div className="relative w-[75%] sm:w-[60%] md:w-[55%] max-w-xs">

//               <div className="relative w-full rounded-xl overflow-hidden bg-black">
//                 <video
//                   ref={videoRef}
//                   src="/alextestimonial.mp4"
//                   className="w-full rounded-xl"
//                   playsInline
//                   preload="auto"
//                   onClick={handleVideoClick} // Handle play/pause when clicking the video
//                 />

//                 {/* Small Button in Bottom-right now */}
//                 <button
//                   onClick={togglePlay}
//                   className="absolute bottom-3 right-3"
//                 >
//                   <div className="bg-white/80 hover:bg-white rounded-full p-3 transition">
//                     {isPlaying ? (
//                       <Pause className="w-5 h-5 text-black" />
//                     ) : (
//                       <Play className="w-5 h-5 text-black" />
//                     )}
//                   </div>
//                 </button>

//               </div>

//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }






"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function TestimonialVideoBoost() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Default to true for autoplay compliance

  // 1. Handle Viewport Autoplay (Must be muted to work)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Browser policy: Autoplay is only allowed if muted
            v.muted = true;
            v.play().catch((e) => console.log("Autoplay prevented:", e));
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.5 } // Wait until 50% visible
    );

    observer.observe(v);
    return () => observer.unobserve(v);
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
    <section className="relative w-full overflow-hidden py-12 md:py-24 flex justify-center">
      <div className="relative w-full max-w-6xl bg-[#F5F5F5] rounded-3xl p-6 md:p-12 mx-4 md:mx-8 flex flex-col items-center justify-center">
        
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
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full">
          
          {/* LEFT TEXT */}
          <div className="md:w-1/2 space-y-6 text-center md:text-left px-2 md:px-4 mb-8 md:mb-0">
            <p className="text-[#4338CA] font-semibold text-sm md:text-base">
              Why Super Sheldon
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Ace Your Exams with Super Sheldon: A Student's Story
            </h2>
          </div>

          {/* RIGHT: Video */}
          <div className="relative md:w-1/2 flex justify-center items-center">
            <div className="relative w-[75%] sm:w-[60%] md:w-[55%] max-w-xs shadow-xl rounded-xl">
              
              <div className="relative w-full rounded-xl overflow-hidden bg-black aspect-[9/16]">
                <video
                  ref={videoRef}
                  src="/alextestimonial.mp4"
                  className="w-full h-full object-cover rounded-xl cursor-pointer"
                  playsInline
                  loop
                  muted={true} // React attribute for initial render
                  // Sync React state with Native Video Events
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onVolumeChange={() => {
                     if(videoRef.current) setIsMuted(videoRef.current.muted)
                  }}
                  onClick={togglePlay}
                />

                {/* Controls Overlay */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  {/* Mute Toggle */}
                  <button
                    onClick={toggleMute}
                    className="bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-2.5 transition transform hover:scale-105"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-white" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-white" />
                    )}
                  </button>

                  {/* Play Toggle */}
                  <button
                    onClick={togglePlay}
                    className="bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-2.5 transition transform hover:scale-105 shadow-lg"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 text-black" />
                    ) : (
                      <Play className="w-4 h-4 text-black ml-0.5" />
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}