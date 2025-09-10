
// "use client";

// import { useRef, useState, useEffect } from "react";
// import { Play, Pause } from "lucide-react";

// export default function ClassVideoBanner() {
//   const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [autoPlayEnabled, setAutoPlayEnabled] = useState(false); // track if visibility control should start

//   // Toggle play/pause manually
//   const togglePlay = () => {
//     if (!videoRef.current) return;

//     if (isPlaying) {
//       videoRef.current.pause();
//       setIsPlaying(false);
//     } else {
//       videoRef.current.play();
//       setIsPlaying(true);
//       setAutoPlayEnabled(true); // start observing only after first manual play
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

//     return () => {
//       observer.unobserve(video);
//     };
//   }, [autoPlayEnabled]); // only run when autoPlayEnabled becomes true

//   return (
//     <div className="mt-20 mb-20 w-full flex flex-col items-center relative">
//       {/* Banner Section */}
//       <div className="w-full h-80 relative overflow-hidden">
//         <img
//           src="/banner.png"
//           alt="Banner"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black/20"></div>
//       </div>

//       {/* Video Section */}
//       <div className="relative z-10 -mt-48 w-[1000px] h-[400px] rounded-3xl overflow-hidden shadow-2xl">
//         <video
//           ref={videoRef}
//           className="w-full h-full object-cover rounded-3xl"
//           src="/studentvid.mp4"
//           poster="/thumbnail.png"
//         />
//         <button
//           onClick={togglePlay}
//           className="absolute inset-0 flex items-center justify-center"
//         >
//           <div className="bg-white/80 hover:bg-white rounded-full p-6 transition">
//             {isPlaying ? (
//               <Pause className="w-12 h-12 text-black" />
//             ) : (
//               <Play className="w-12 h-12 text-black" />
//             )}
//           </div>
//         </button>
//       </div>

//       {/* Sections Below Video */}
//       <div className="flex flex-col md:flex-row gap-6 justify-center items-center w-full max-w-4xl mt-20 px-4">
//         {/* Audio Classes */}
//         <div className="flex bg-white items-center gap-3 px-4 py-3 rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl transition">
//           <div className="p-2 rounded-full w-12 h-12 flex items-center justify-center">
//             <img
//               src="/icons/science.png"
//               alt="Audio Classes"
//               className="w-6 h-6 object-contain"
//             />
//           </div>
//           <span className="text-lg font-semibold">Audio Classes</span>
//         </div>

//         {/* Live Classes */}
//         <div className="flex bg-white items-center gap-3 px-4 py-3 rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl transition">
//           <div className="p-2 rounded-full w-12 h-12 flex items-center justify-center">
//             <img
//               src="/icons/Scholarcap.png"
//               alt="Live Classes"
//               className="w-6 h-6 object-contain"
//             />
//           </div>
//           <span className="text-lg font-semibold">Live Classes</span>
//         </div>

//         {/* Recorded Class */}
//         <div className="flex bg-white items-center gap-3 px-4 py-3 rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl transition">
//           <div className="p-2 rounded-full w-12 h-12 flex items-center justify-center">
//             <img
//               src="/icons/homework.png"
//               alt="Recorded Class"
//               className="w-6 h-6 object-contain"
//             />
//           </div>
//           <span className="text-lg font-semibold">Recorded Class</span>
//         </div>
//       </div>
//       <div className="absolute top-16 left-16 -translate-x-1/3 animate-float1 z-10">
//   <img src="/icons/book.png" alt="globe" width={60} height={60}  />
// </div>
// <div className="absolute top-32 right-24 animate-float1 z-10">
//   <img src="/icons/science.png" alt="" width={50} height={50} />
// </div>
// <div className="absolute bottom-24  left-24 animate-float1 z-10">
//   <img src="/icons/palette.png" alt="" width={60} height={60} />
// </div>
// <div className="absolute bottom-16  right-24 animate-float1 z-10">
//   <img src="/icons/abacus.png" alt="" width={60} height={60} />
// </div>


// <style jsx>{`
//   @keyframes float1 {
//     0%, 100% { transform: translateY(0) rotate(-45deg); }
//     50% { transform: translateY(-12px) rotate(-45deg); }
//   }
//   @keyframes float2 {
//     0%, 100% { transform: translateX(0) rotate(45deg); }
//     50% { transform: translateX(12px) rotate(45deg); }
//   }
//   @keyframes float3 {
//     0%, 100% { transform: translateY(0) translateX(0); }
//     50% { transform: translateY(-10px) translateX(10px); }
//   }
//   .animate-float1 { animation: float1 4s ease-in-out infinite; }
//   .animate-float2 { animation: float2 5s ease-in-out infinite; }
//   .animate-float3 { animation: float3 6s ease-in-out infinite; }
// `}</style>

//     </div>
    
//   );
// }





"use client";

import { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";

export default function ClassVideoBanner() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);

  // Toggle play/pause manually
  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      setAutoPlayEnabled(true);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoPlayEnabled) return;

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
  }, [autoPlayEnabled]);

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
          src="/studentvid.mp4"
          poster="/thumbnail.png"
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
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center w-full max-w-4xl mt-16 px-2">
        {/* Audio Classes */}
        <div className="flex bg-white items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl transition w-full md:w-auto">
          <div className="p-2 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
            <img src="/icons/science.png" alt="Audio Classes" className="w-6 h-6 object-contain" />
          </div>
          <span className="text-base sm:text-lg font-semibold">Audio Classes</span>
        </div>

        {/* Live Classes */}
        <div className="flex bg-white items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl transition w-full md:w-auto">
          <div className="p-2 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
            <img src="/icons/Scholarcap.png" alt="Live Classes" className="w-6 h-6 object-contain" />
          </div>
          <span className="text-base sm:text-lg font-semibold">Live Classes</span>
        </div>

        {/* Recorded Class */}
        <div className="flex bg-white items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl transition w-full md:w-auto">
          <div className="p-2 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
            <img src="/icons/homework.png" alt="Recorded Class" className="w-6 h-6 object-contain" />
          </div>
          <span className="text-base sm:text-lg font-semibold">Recorded Class</span>
        </div>
      </div>

      {/* Floating Icons */}
      <div className="absolute top-8 left-6 sm:top-12 sm:left-16 animate-float1 z-10">
        <img src="/icons/book.png" alt="Book" className="w-10 sm:w-12 md:w-14 lg:w-[60px]" />
      </div>
      <div className="absolute top-20 right-12 sm:top-28 sm:right-24 animate-float1 z-10">
        <img src="/icons/science.png" alt="Science" className="w-8 sm:w-10 md:w-12 lg:w-[50px]" />
      </div>
      <div className="absolute bottom-20 left-10 sm:bottom-24 sm:left-24 animate-float1 z-10">
        <img src="/icons/palette.png" alt="Palette" className="w-10 sm:w-12 md:w-14 lg:w-[60px]" />
      </div>
      <div className="absolute bottom-12 right-10 sm:bottom-16 sm:right-24 animate-float1 z-10">
        <img src="/icons/abacus.png" alt="Abacus" className="w-10 sm:w-12 md:w-14 lg:w-[60px]" />
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
