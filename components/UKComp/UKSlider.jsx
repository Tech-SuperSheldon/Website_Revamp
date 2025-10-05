

// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";

// export default function HeroCarousel() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   const images = [
//     "/images/demo-1.jpg",
//     "/images/demo-2.jpg",
//     "/images/demo-3.jpg",
//   ];

//   // Auto-play every 5s
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIsTransitioning(true);
//       setTimeout(() => {
//         setCurrentIndex((prev) => (prev + 1) % images.length);
//         setIsTransitioning(false);
//       }, 300);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [images.length]);

//   return (
//     <div className="w-full min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-10">
//       <div className="relative w-full max-w-7xl bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl shadow-2xl p-8 lg:p-12 overflow-visible">
//         <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
          
//           {/* Text + Email */}
//           <div className="text-white space-y-6 flex-1 order-2 lg:order-1 lg:max-w-md">
//             <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
//               Unlocking <span className="text-white">Potential,</span>
//               <br />
//               <span className="text-white">Powering</span> Results
//             </h1>
//             <p className="text-xl text-blue-100">
//               Short, motivational, powerful.
//             </p>
//             <div className="relative max-w-md">
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 className="w-full pl-6 pr-28 py-4 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
//               />
//               <button className="absolute right-1.5 top-1/2 transform -translate-y-1/2 px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-all text-sm">
//                 Submit
//               </button>
//             </div>
//           </div>

//           {/* Card Stack Carousel */}
//           <div className="relative flex-shrink-0 order-1 lg:order-2 overflow-visible">
//             <div className="relative w-72 h-72 lg:w-96 lg:h-96 overflow-visible">
//               {images.map((img, index) => {
//                 const offset =
//                   (index - currentIndex + images.length) % images.length;
//                 const isActive = offset === 0;

//                 return (
//                   <div
//                     key={index}
//                     className={`absolute transition-all duration-500 ease-out ${
//                       isTransitioning && isActive ? "opacity-0" : "opacity-100"
//                     }`}
//                     style={{
//                       top: `${offset * -18}px`, // behind cards stack upwards
//                       left: `${offset * 0}px`,
//                       width: `calc(100% - ${offset * 16}px)`,
//                       height: `calc(100% - ${offset * 16}px)`,
//                       zIndex: images.length - offset,
//                       filter:
//                         offset === 0
//                           ? "brightness(1)"
//                           : offset === 1
//                           ? "brightness(0.8)"
//                           : "brightness(0.6)",
//                       opacity: offset <= 2 ? 1 : 0,
//                       // active card overflow downward
//                       overflow: isActive ? "visible" : "hidden",
//                     }}
//                   >
//                     <div
//                       className={`w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden`}
//                       style={{
//                         // active card can overflow bottom
//                         overflow: isActive ? "visible" : "hidden",
//                       }}
//                     >
//                       <Image
//                         src={img}
//                         alt={`Slide ${index + 1}`}
//                         fill
//                         className={`object-cover ${isActive ? "relative bottom-0" : ""}`}
//                       />
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }










"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const images = [
    "/UK/carousel/1.png",
    "/UK/carousel/2.png",
    "/UK/carousel/3.png",
  ];

  // Auto-play every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div className="relative w-full max-w-7xl bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl shadow-2xl p-8 lg:p-12 overflow-visible">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
          
          {/* Text + Email */}
          <div className="text-white space-y-6 flex-1 order-2 lg:order-1 lg:max-w-md">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Unlocking <span className="text-white">Potential,</span>
              <br />
              <span className="text-white">Powering</span> Results
            </h1>
            <p className="text-xl text-blue-100">
              Short, motivational, powerful.
            </p>
            <div className="relative max-w-md">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-6 pr-28 py-4 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
              />
              <button className="absolute right-1.5 top-1/2 transform -translate-y-1/2 px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-all text-sm">
                Submit
              </button>
            </div>
          </div>

          {/* Card Stack Carousel */}
          <div className="relative flex-shrink-0 order-1 lg:order-2 overflow-visible lg:mt-12">
            <div className="relative w-72 h-72 lg:w-96 lg:h-96 overflow-visible">
              {images.map((img, index) => {
                const offset =
                  (index - currentIndex + images.length) % images.length;
                const isActive = offset === 0;

                return (
                  <div
                    key={index}
                    className={`absolute transition-all duration-500 ease-out ${
                      isTransitioning && isActive ? "opacity-0" : "opacity-100"
                    }`}
                    style={{
                      top: `${offset * -22}px`,       // show more on TOP
                      left: `${offset * -14}px`,      // also shift LEFT a bit
                      width: `calc(100% - ${offset * 10}px)`,
                      height: `calc(100% - ${offset * 10}px)`,
                      zIndex: images.length - offset,
                      filter:
                        offset === 0
                          ? "brightness(1)"
                          : offset === 1
                          ? "brightness(0.8)"
                          : "brightness(0.6)",
                      opacity: offset <= 2 ? 1 : 0,
                      overflow: isActive ? "visible" : "hidden", // active card spills
                    }}
                  >
                    <div
                      className="w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden"
                      style={{
                        overflow: isActive ? "visible" : "hidden",
                      }}
                    >
                      <Image
                        src={img}
                        alt={`Slide ${index + 1}`}
                        fill
                        className={`object-cover ${isActive ? "relative bottom-[-30px]" : ""}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
