




// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Play, Pause } from "lucide-react";
// import GlossyButton from "./GlossyButton";
// import Link from "next/link";

// const videos = [
//   { id: 2, name: "Ms. Aditi", src: "/videos/video2.mp4" },
//   { id: 1, name: "Ms. Abha", src: "/videos/video1.mp4" }
// ];

// export default function TeacherTestimonial() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const videoRef = useRef(null);

//   const currentVideo = videos[currentIndex];

//   const togglePlay = () => {
//     if (!videoRef.current) return;
//     if (isPlaying) {
//       videoRef.current.pause();
//       setIsPlaying(false);
//     } else {
//       videoRef.current.muted = false;
//       videoRef.current
//         .play()
//         .then(() => setIsPlaying(true))
//         .catch(() => setIsPlaying(false));
//     }
//   };

//   const handleVideoEnd = () => {
//     const nextIndex = (currentIndex + 1) % videos.length;
//     setCurrentIndex(nextIndex);
//     setIsPlaying(false);
//   };

//   useEffect(() => {
//     if (!videoRef.current) return;
//     videoRef.current.pause();
//     videoRef.current.load();
//     setIsPlaying(false);
//   }, [currentIndex]);

//   useEffect(() => {
//     if (!videoRef.current) return;
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             if (isPlaying) {
//               videoRef.current.play().catch(() => {});
//             }
//           } else {
//             videoRef.current.pause();
//             setIsPlaying(false);
//           }
//         });
//       },
//       { threshold: 0.6 }
//     );
//     observer.observe(videoRef.current);
//     return () => observer.disconnect();
//   }, [currentIndex, isPlaying]);

//   return (
//     <section id="testimonial" className="relative flex flex-col items-center py-16 px-4 overflow-hidden">
//       {/* Background Gradient */}
//       <div className="absolute inset-0 -z-20 flex items-center justify-center">
//         <div className="w-[400px] sm:w-[600px] md:w-[700px] h-[400px] sm:h-[600px] md:h-[700px] rounded-full bg-orange-200 opacity-30 blur-3xl"></div>
//       </div>
//       <div className="absolute -left-[150px] sm:-left-[250px] md:-left-[300px] top-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] rounded-full bg-orange-200 opacity-20 blur-3xl pointer-events-none" />
//       <div className="absolute -right-[150px] sm:-right-[250px] md:-right-[300px] top-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] rounded-full bg-orange-200 opacity-20 blur-3xl pointer-events-none" />

//       {/* Title */}
//       <h2 className="text-5xl sm:text-2xl md:text-5xl font-quicksand font-semibold mb-10 text-center">
//         Behind Every Success, <br /><div className="text-red-400">A Teacher's Story</div>
//       </h2>

//       {/* Wrapper */}
//       <div className="relative flex flex-col md:flex-row items-center justify-center w-full max-w-7xl gap-6 md:gap-0">
        
//         {/* Left Info Cards */}
//         <div className="flex flex-col gap-4 static md:absolute md:left-[calc(50%+210px)] md:top-[100px] w-full sm:w-auto items-center md:items-start">
//           <div className="bg-white shadow-lg rounded-2xl p-4 w-full sm:w-60 flex flex-col justify-between font-manrope shadow-gray-500">
//             <img src="/pcmouse.png" className="w-10 sm:w-12 h-10 sm:h-12" alt="logo" />
//             <div className="mx-auto text-center">
//               <h3 className="font-semibold text-lg sm:text-xl">2M+ Questions</h3>
//               <p className="text-sm sm:text-base text-gray-600 pb-3">2M+ extra projects</p>
              
//               <Link
//               href="https://forms.gle/csc94GLG3tEDit6N6"
//               target="_blank"
//               rel="noopener noreferrer"
//     >

                  
//                   <GlossyButton
//                     className="flex-1 bg-orange-500 text-white py-2 px-3 rounded-full hover:bg-orange-600 transition"
//                   >
//                     Try a free Class
//                   </GlossyButton>
//                   </Link>
//             </div>
//           </div>
//           <div className="bg-white shadow-lg shadow-gray-500 rounded-2xl p-4 sm:p-6 w-full sm:w-56 flex flex-col justify-center items-center font-manrope">
//             <img src="/srch.png" className="w-9 sm:w-11 h-9 sm:h-11 mb-2" alt="logo" />
//             <h3 className="font-semibold text-lg sm:text-xl">100K+</h3>
//             <p className="text-sm sm:text-base text-gray-600">Worldwide Students</p>
//           </div>
//         </div>

//         {/* Center Video */}
//         <div className="relative w-[220px] sm:w-[280px] md:w-[340px] lg:w-[380px] aspect-[9/16] flex items-center justify-center shadow-xl rounded-full">
//           <div className="absolute -z-10 w-[260px] h-[260px] rounded-full bg-blue-900/60"></div>
//           <div className="absolute -z-10 w-[340px] h-[340px] rounded-full bg-blue-700/50"></div>
//           <div className="absolute -z-10 w-[420px] h-[420px] rounded-full bg-blue-500/40"></div>
//           <div className="absolute -z-10 w-[500px] h-[500px] rounded-full bg-blue-300/30"></div>
//           <div className="absolute -z-10 w-[580px] h-[580px] rounded-full bg-blue-100/20"></div>
//   <div
//             className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
//             onClick={togglePlay}
//           >
//             <video
//               key={currentVideo.src}
//               ref={videoRef}
//               src={currentVideo.src}
//               className="w-full h-full object-cover"
//               onEnded={handleVideoEnd}
//               playsInline
//               controls={false}
//             />
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 togglePlay();
//               }}
//               aria-label={isPlaying ? "Pause video" : "Play video"}
//               className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-black/40 p-1 sm:p-2 rounded-full"
//             >
//               {isPlaying ? (
//                 <Pause className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
//               ) : (
//                 <Play className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
//               )}
//             </button>
//             <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 text-sm sm:text-lg font-adamina text-white drop-shadow-lg">
//               {currentVideo.name}
//             </div>
//           </div>
//         </div>

//         {/* Right Info Cards */}
//         <div className="flex flex-col gap-4 static md:absolute md:right-[calc(50%+210px)] md:top-[140px] w-full sm:w-auto items-center md:items-end">
//           <div className="bg-white shadow-lg shadow-gray-500 rounded-2xl p-4 sm:p-6 w-full sm:w-56 flex flex-col justify-center items-center font-manrope">
//             <img src="/msg.png" className="w-10 sm:w-12 h-10 sm:h-12 mb-2" alt="logo" />
//             <h3 className="font-semibold text-base sm:text-lg">Future Opportunities</h3>
//           </div>
//           <div className="bg-white shadow-lg shadow-gray-500 rounded-2xl p-4 w-full sm:w-60 flex flex-col justify-center items-center font-manrope">
//             <img src="/add.png" className="w-12 sm:w-14 h-12 sm:h-14 mb-2" alt="logo" />
//             <div className="mx-auto text-center">
//               <h3 className="font-semibold text-lg sm:text-xl">MIT Certified +</h3>
//               <p className="text-sm sm:text-base text-gray-600 pb-3">All teachers MIT certified</p>
//               <Link
//              href="https://forms.gle/csc94GLG3tEDit6N6"
//              target="_blank"
//               rel="noopener noreferrer"
//               >

                  
//                   <GlossyButton
//                     className="flex-1 bg-orange-500 text-white py-2 px-3 rounded-full hover:bg-orange-600 transition"
//                   >
//                     Try a free Class
//                   </GlossyButton>
//                   </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navigator Dots */}
//       <div className="flex mt-6 gap-3">
//         {videos.map((_, index) => (
//           <button
//             key={index}
//             aria-label={`Go to video ${index + 1}`}
//             onClick={() => {
//               setCurrentIndex(index);
//               setIsPlaying(false);
//             }}
//             className={`w-3 h-3 rounded-full transition ${
//               index === currentIndex ? "bg-orange-500" : "bg-gray-300"
//             }`}
//           />
//         ))}
//       </div>

//       {/* Floating Logos */}
//       {/* <img src="/saturn.png" className="absolute left-5 sm:left-20 top-20 sm:top-36 w-10 sm:w-14 animate-spin-slow" alt="planet" />
//       <img src="/pencil.png" className="absolute left-5 sm:left-20 bottom-10 sm:bottom-20 w-8 sm:w-10 animate-bounce" alt="book" />
//       <img src="/blacksquiggle.png" className="absolute right-5 sm:right-20 bottom-10 sm:bottom-20 w-12 sm:w-16 animate-bounce" alt="atom" />
//       <img src="/blacksquiggle.png" className="absolute left-5 sm:left-20 top-5 sm:top-8 w-12 sm:w-16 animate-bounce" alt="star" />
//       <img src="/orangesquiggle.png" className="absolute right-5 sm:right-20 top-5 sm:top-8 w-12 sm:w-16 animate-bounce" alt="lightbulb" /> */}

//           <div className="absolute bottom-32 left-16 -translate-x-1/3 animate-float1 z-10 rotate-[45]">
//   <img src="/icons/book.png" alt="globe" width={60} height={60}  />
// </div>
// <div className="absolute bottom-32 right-24 animate-float2 z-10">
//   <img src="/icons/science.png" alt="" width={50} height={50} />
// </div>
// <div className="absolute top-64  left-12 animate-float2 z-10">
//   <img src="/icons/palette.png" alt="" width={60} height={60} />
// </div>
// <div className="absolute top-1/2   right-12 animate-float1 z-10">
//   <img src="/icons/Scholarcap.png" alt="" width={60} height={60} />
// </div>
// <div className="absolute top-16  right-64 animate-float1 z-10">
//   <img src="/icons/homework.png" alt="" width={50} height={50} />
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


//     </section>
//   );
// }



"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import GlossyButton from "./GlossyButton";
import Link from "next/link";
import { useOpenDemoBooking } from "./utils/navigation";

const videos = [
  { id: 2, name: "Ms. Aditi", src: "/videos/video2.mp4" },
  { id: 1, name: "Ms. Abha", src: "/videos/video1.mp4" },
];

export default function TeacherTestimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const openDemoBooking =useOpenDemoBooking();

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

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.load();
    setIsPlaying(false);
  }, [currentIndex]);

  useEffect(() => {
    if (!videoRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (isPlaying) {
              videoRef.current.play().catch(() => {});
            }
          } else {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.6 }
    );
    observer.observe(videoRef.current);
    return () => observer.disconnect();
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

      {/* Wrapper */}
      <div className="relative flex flex-col md:flex-row items-center justify-center w-full max-w-7xl gap-6">
        {/* Left Info Cards */}
        <div className="flex flex-col gap-4 static md:absolute md:left-[calc(50%+18vw)] md:top-[80px] w-full sm:w-auto items-center md:items-start">
          <div className="bg-white shadow-lg rounded-2xl p-4 w-full max-w-[250px] flex flex-col justify-between font-manrope shadow-gray-500">
            <img src="/pcmouse.png" className="w-10 sm:w-12 h-10 sm:h-12" alt="logo" />
            <div className="mx-auto text-center">
              <h3 className="font-semibold text-lg sm:text-xl">2M+ Questions</h3>
              <p className="text-sm sm:text-base text-gray-600 pb-3">2M+ extra projects</p>
              <GlossyButton onClick={openDemoBooking} className=" bg-orange-500 text-white py-2 px-3 rounded-full hover:bg-orange-600 transition">
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
          <div className="absolute -z-10 w-[70%] max-w-[260px] aspect-square rounded-full bg-blue-900/60"></div>
          <div className="absolute -z-10 w-[90%] max-w-[340px] aspect-square rounded-full bg-blue-700/50"></div>
          <div className="absolute -z-10 w-[110%] max-w-[420px] aspect-square rounded-full bg-blue-500/40"></div>
          <div className="absolute -z-10 w-[130%] max-w-[500px] aspect-square rounded-full bg-blue-300/30"></div>
          <div className="absolute -z-10 w-[150%] max-w-[580px] aspect-square rounded-full bg-blue-100/20"></div>
          <div
            className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
            onClick={togglePlay}
          >
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
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white" />
              )}
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
              <GlossyButton onClick={openDemoBooking} className=" bg-orange-500 text-white py-2 px-3 rounded-full hover:bg-orange-600 transition">
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
            className={`w-3 h-3 rounded-full transition ${
              index === currentIndex ? "bg-orange-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Floating Icons */}
      <div className="absolute bottom-[15%] left-[8%] animate-float1 z-10">
        <img src="/icons/book.png" alt="book" className="w-[10vw] max-w-[60px]" />
      </div>
      <div className="absolute bottom-[15%] right-[8%] animate-float2 z-10">
        <img src="/icons/science.png" alt="science" className="w-[9vw] max-w-[50px]" />
      </div>
      <div className="absolute top-[55%] left-[5%] animate-float2 z-10">
        <img src="/icons/palette.png" alt="palette" className="w-[10vw] max-w-[60px]" />
      </div>
      <div className="absolute top-1/2 right-[5%] animate-float1 z-10">
        <img src="/icons/Scholarcap.png" alt="cap" className="w-[10vw] max-w-[60px]" />
      </div>
      <div className="absolute top-[10%] right-[25%] animate-float1 z-10">
        <img src="/icons/homework.png" alt="homework" className="w-[9vw] max-w-[50px]" />
      </div>

      <style jsx>{`
        @keyframes float1 {
          0%,
          100% {
            transform: translateY(0) rotate(-45deg);
          }
          50% {
            transform: translateY(-12px) rotate(-45deg);
          }
        }
        @keyframes float2 {
          0%,
          100% {
            transform: translateX(0) rotate(45deg);
          }
          50% {
            transform: translateX(12px) rotate(45deg);
          }
        }
        @keyframes float3 {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-10px) translateX(10px);
          }
        }
        .animate-float1 {
          animation: float1 4s ease-in-out infinite;
        }
        .animate-float2 {
          animation: float2 5s ease-in-out infinite;
        }
        .animate-float3 {
          animation: float3 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
