


// "use client";

// import { useRef, useState, useEffect } from "react";
// import { Play, Pause } from "lucide-react";

// export default function ClassVideoBanner() {
//   const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);

//   // Toggle play/pause manually
//   const togglePlay = () => {
//     if (!videoRef.current) return;

//     if (isPlaying) {
//       videoRef.current.pause();
//       setIsPlaying(false);
//     } else {
//       videoRef.current.play();
//       setIsPlaying(true);
//       setAutoPlayEnabled(true);
//     }
//   };

//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video || !autoPlayEnabled) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             video.play();
//             setIsPlaying(true);
//           } else {
//             video.pause();
//             setIsPlaying(false);
//           }
//         });
//       },
//       { threshold: 0.5 }
//     );

//     observer.observe(video);
//     return () => observer.unobserve(video);
//   }, [autoPlayEnabled]);

//   return (
//     <div className="mt-20 mb-20 w-full flex flex-col items-center relative px-4">
//       {/* Banner Section */}
//       <div className="w-full h-48 sm:h-64 md:h-72 lg:h-80 relative overflow-hidden rounded-xl">
//         <img
//           src="/banner.png"
//           alt="Banner"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black/20"></div>
//       </div>

//       {/* Video Section */}
//       <div className="relative z-10 -mt-24 sm:-mt-32 md:-mt-40 w-full max-w-5xl h-48 sm:h-64 md:h-80 lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
//         <video
//           ref={videoRef}
//           className="w-full h-full object-cover rounded-2xl"
//           src="/studentvid.mp4"
//           poster="/thumbnail.png"
//         />
//         <button
//           onClick={togglePlay}
//           className="absolute inset-0 flex items-center justify-center"
//         >
//           <div className="bg-white/80 hover:bg-white rounded-full p-4 sm:p-5 md:p-6 transition">
//             {isPlaying ? (
//               <Pause className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-black" />
//             ) : (
//               <Play className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-black" />
//             )}
//           </div>
//         </button>
//       </div>

//       {/* Sections Below Video */}
// <div className="flex flex-col md:flex-row gap-6 justify-center items-center w-full max-w-5xl mt-16 px-4">
//   {/* 1:1 Sessions */}
//   <div className="flex bg-white items-center gap-4 px-5 sm:px-6 py-4 sm:py-5 rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl transition w-full md:w-auto">
//     <div className="p-3 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
//       <img src="/3column/1.gif" alt="Audio Classes" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
//     </div>
//     <span className="text-lg sm:text-xl font-semibold">1:1 Sessions</span>
//   </div>

//   {/* Live Recorded Classes */}
//   <div className="flex bg-white items-center gap-4 px-5 sm:px-6 py-4 sm:py-5 rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl transition w-full md:w-auto">
//     <div className="p-3 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
//       <img src="/3column/2.gif" alt="Live Classes" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
//     </div>
//     <span className="text-lg sm:text-xl font-semibold">Live Recorded Classes</span>
//   </div>

//   {/* Homework and Tests */}
//   <div className="flex bg-white items-center gap-4 px-5 sm:px-6 py-4 sm:py-5 rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl transition w-full md:w-auto">
//     <div className="p-3 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
//       <img src="/3column/3.gif" alt="Recorded Class" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
//     </div>
//     <span className="text-lg sm:text-xl font-semibold">Homework and tests</span>
//   </div>
// </div>


//       {/* Floating Icons */}
//       <div className="absolute -top-12 left-6 sm:top-12 sm:left-16 animate-float1 z-10">
//         <img src="/icons/Backpack.png" alt="Book" className="w-10 sm:w-12 md:w-14 lg:w-[60px]" />
//       </div>
//       <div className="absolute -top-10 right-12 sm:top-28 sm:right-24 animate-float1 z-10">
//         <img src="/icons/globe.png" alt="Science" className="w-8 sm:w-10 md:w-12 lg:w-[50px]" />
//       </div>
//       <div className="absolute -bottom-16 left-10 sm:bottom-24 sm:left-24 animate-float1 z-10">
//         <img src="/icons/crayons.png" alt="Palette" className="w-10 sm:w-12 md:w-14 lg:w-[60px]" />
//       </div>
//       <div className="absolute -bottom-16 right-10 sm:bottom-16 sm:right-24 animate-float1 z-10">
//         <img src="/icons/alarm.png" alt="Abacus" className="w-10 sm:w-12 md:w-14 lg:w-[60px]" />
//       </div>

//       <style jsx>{`
//         @keyframes float1 {
//           0%, 100% { transform: translateY(0) rotate(-45deg); }
//           50% { transform: translateY(-12px) rotate(-45deg); }
//         }
//         .animate-float1 { animation: float1 4s ease-in-out infinite; }
//       `}</style>
//     </div>
//   );
// }







"use client";

import { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";

export default function ClassVideoBanner() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Toggle play/pause manually
  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Auto play + auto pause when in view
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play();
            setIsPlaying(true);
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.unobserve(video);
  }, []);

  return (
    <div className="mt-20 mb-20 w-full flex flex-col items-center relative px-4">
      {/* Banner Section */}
      <div className="w-full h-48 sm:h-64 md:h-72 lg:h-80 relative overflow-hidden rounded-xl">
        <img
          src="/banner.png"
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Video Section */}
      <div className="relative z-10 -mt-24 sm:-mt-32 md:-mt-40 w-full max-w-5xl h-48 sm:h-64 md:h-80 lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
        <video
          ref={videoRef}
          className="w-full h-full object-cover rounded-2xl"
          src="/studentvid-compressed.mp4"
          poster="/thumbnail.webp"
        />
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="bg-white/80 hover:bg-white rounded-full p-4 sm:p-5 md:p-6 transition">
            {isPlaying ? (
              <Pause className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-black" />
            ) : (
              <Play className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-black" />
            )}
          </div>
        </button>
      </div>

      {/* Sections Below Video */}
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center w-full max-w-5xl mt-16 px-4">
        <div className="flex bg-white items-center gap-4 px-5 sm:px-6 py-4 sm:py-5 rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl transition w-full md:w-auto">
          <div className="p-3 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
            <img src="/3column/1.gif" alt="Audio Classes" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
          </div>
          <span className="text-lg sm:text-xl font-semibold">1:1 Sessions</span>
        </div>

        <div className="flex bg-white items-center gap-4 px-5 sm:px-6 py-4 sm:py-5 rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl transition w-full md:w-auto">
          <div className="p-3 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
            <img src="/3column/2.gif" alt="Live Classes" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
          </div>
          <span className="text-lg sm:text-xl font-semibold">Live Recorded Classes</span>
        </div>

        <div className="flex bg-white items-center gap-4 px-5 sm:px-6 py-4 sm:py-5 rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl transition w-full md:w-auto">
          <div className="p-3 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
            <img src="/3column/3.gif" alt="Recorded Class" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
          </div>
          <span className="text-lg sm:text-xl font-semibold">Homework and tests</span>
        </div>
      </div>

      {/* Floating Icons */}
      <div className="absolute -top-12 left-6 sm:top-12 sm:left-16 animate-float1 z-10">
        <img src="/icons/Backpack.png" alt="Book" className="w-10 sm:w-12 md:w-14 lg:w-[60px]" />
      </div>
      <div className="absolute -top-10 right-12 sm:top-28 sm:right-24 animate-float1 z-10">
        <img src="/icons/globe.png" alt="Science" className="w-8 sm:w-10 md:w-12 lg:w-[50px]" />
      </div>
      <div className="absolute -bottom-16 left-10 sm:bottom-24 sm:left-24 animate-float1 z-10">
        <img src="/icons/crayons.png" alt="Palette" className="w-10 sm:w-12 md:w-14 lg:w-[60px]" />
      </div>
      <div className="absolute -bottom-16 right-10 sm:bottom-16 sm:right-24 animate-float1 z-10">
        <img src="/icons/alarm.png" alt="Abacus" className="w-10 sm:w-12 md:w-14 lg:w-[60px]" />
      </div>

      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0) rotate(-45deg); }
          50% { transform: translateY(-12px) rotate(-45deg); }
        }
        .animate-float1 { animation: float1 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
