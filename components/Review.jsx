


// "use client";
// import React from "react";
// import Image from "next/image";

// const Review = () => {
//   return (
//     <section className="relative py-12 flex flex-col items-center text-center px-6">
//       {/* Title */}
//       <h2
//         className="font-quicksand font-semibold text-center align-middle mb-6"
//         style={{
//           fontSize: "50px",
//           lineHeight: "88px",
//           letterSpacing: "-1px",
//         }}
//       >
//         From Our <span className="text-red-400">Hearts</span> to 
//         <br /> Thousands of 
        
//         <span className="text-orange-400"> Australian</span> 
//         <span className="text-orange-400"> Homes</span>

//       </h2>

//       {/* Subtitle */}
//       <p className="text-base md:text-lg font-poppins text-gray-600 max-w-xl leading-relaxed">
//         Guiding students and parents toward brighter futures every day.
//       </p>

//       {/* Orange Box */}
//       <div
//         className="mt-12 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 relative rounded-2xl text-white overflow-hidden"
//         style={{
//           backgroundColor: "#D05029",
//           boxShadow: "4px 4px 0px #000000",
//         }}
//       >
//         {/* Section 1 */}
//         <div className="flex flex-col items-center justify-start text-center px-8 py-10 relative">
//           <Image
//             src="/learn.png"
//             alt="Learn Icon"
//             width={60}
//             height={60}
//             className="mb-4"
//           />
//           <h3 className="font-rowdies text-2xl mb-2">01. Learn</h3>
//           <p className="font-poppins text-base md:text-lg max-w-xs">
//             82% of Supersheldon parents agree their child’s grades have improved.
//           </p>

//           {/* Vertical dotted line with gradient fade */}
//           <div className="hidden md:block absolute right-0 top-0 bottom-0 w-px">
//             <div className="relative h-full w-full">
//               <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,white_0,white_4px,transparent_4px,transparent_8px)] opacity-70" />
//               <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#D05029] to-transparent" />
//               <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#D05029] to-transparent" />
//             </div>
//           </div>
//         </div>

//         {/* Section 2 */}
//         <div className="flex flex-col items-center justify-start text-center px-8 py-10 relative">
//           <Image
//             src="/academics.png"
//             alt="Academics Icon"
//             width={60}
//             height={60}
//             className="mb-4"
//           />
//           <h3 className="font-rowdies text-2xl mb-2">02. Academics</h3>
//           <p className="font-poppins text-base md:text-lg max-w-xs">
//             95% of Supersheldon parents celebrate their child’s improved grades
//             and academic success.
//           </p>

//           {/* Divider */}
//           <div className="hidden md:block absolute right-0 top-0 bottom-0 w-px">
//             <div className="relative h-full w-full">
//               <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,white_0,white_4px,transparent_4px,transparent_8px)] opacity-70" />
//               <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#D05029] to-transparent" />
//               <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#D05029] to-transparent" />
//             </div>
//           </div>
//         </div>

//         {/* Section 3 */}
//         <div className="flex flex-col items-center justify-start text-center px-8 py-10 relative">
//           <Image
//             src="/parents.png"
//             alt="Feedback Icon"
//             width={60}
//             height={60}
//             className="mb-4"
//           />
//           <h3 className="font-rowdies text-2xl mb-2">03. Parents Feedback</h3>
//           <p className="font-poppins text-base md:text-lg max-w-xs">
//             85% of Supersheldon parents agree their child is more confident.
//           </p>
//         </div>
//       </div>

//       <div className="absolute bottom-6 left-8 -translate-x-1/3 animate-float1 z-10 rotate-[45]">
//   <img src="/icons/book.png" alt="globe" width={60} height={60}  />
// </div>
// <div className="absolute bottom-8 right-6 animate-float2 z-10">
//   <img src="/icons/backpack.png" alt="" width={60} height={60} />
// </div>
// <div className="absolute top-4  left-32 animate-float2 z-10">
//   <img src="/icons/lamp.png" alt="" width={60} height={60} />
// </div>
// <div className="absolute top-4  right-32 animate-float1 z-10">
//   <img src="/icons/Scholarcap.png" alt="" width={60} height={60} />
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
// };

// export default Review;










"use client";
import React from "react";
import Image from "next/image";

const Review = () => {
  return (
    <section className="relative py-12 flex flex-col items-center text-center px-4 sm:px-6 lg:px-12">
      {/* Title */}
      <h2
        className="font-quicksand font-semibold text-center mb-6 leading-tight"
        style={{
          fontSize: "clamp(28px, 6vw, 50px)",
          lineHeight: "clamp(36px, 8vw, 70px)",
          letterSpacing: "-1px",
        }}
      >
        From Our <span className="text-red-400">Hearts</span> to
        <br /> Thousands of{" "}
        <span className="text-orange-400">Australian</span>
        <span className="text-orange-400"> Homes</span>
      </h2>

      {/* Subtitle */}
      <p className="text-sm sm:text-base md:text-lg font-poppins text-gray-600 max-w-xl leading-relaxed px-2">
        Guiding students and parents toward brighter futures every day.
      </p>

      {/* Orange Box */}
      <div
        className="mt-12 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 relative rounded-2xl text-white overflow-hidden"
        style={{
          backgroundColor: "#D05029",
          boxShadow: "4px 4px 0px #000000",
        }}
      >
        {/* Section 1 */}
        <div className="flex flex-col items-center justify-start text-center px-6 sm:px-8 py-8 sm:py-10 relative">
          <Image
            src="/learn.png"
            alt="Learn Icon"
            width={60}
            height={60}
            className="mb-4 w-12 h-12 sm:w-14 sm:h-14"
          />
          <h3 className="font-rowdies text-xl sm:text-2xl mb-2">01. Learn</h3>
          <p className="font-poppins text-sm sm:text-base md:text-lg max-w-xs">
            82% of Supersheldon parents agree their child’s grades have improved.
          </p>

          {/* Vertical dotted line */}
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-px">
            <div className="relative h-full w-full">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,white_0,white_4px,transparent_4px,transparent_8px)] opacity-70" />
              <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#D05029] to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#D05029] to-transparent" />
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col items-center justify-start text-center px-6 sm:px-8 py-8 sm:py-10 relative">
          <Image
            src="/academics.png"
            alt="Academics Icon"
            width={60}
            height={60}
            className="mb-4 w-12 h-12 sm:w-14 sm:h-14"
          />
          <h3 className="font-rowdies text-xl sm:text-2xl mb-2">02. Academics</h3>
          <p className="font-poppins text-sm sm:text-base md:text-lg max-w-xs">
            95% of Supersheldon parents celebrate their child’s improved grades
            and academic success.
          </p>

          {/* Divider */}
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-px">
            <div className="relative h-full w-full">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,white_0,white_4px,transparent_4px,transparent_8px)] opacity-70" />
              <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#D05029] to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#D05029] to-transparent" />
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="flex flex-col items-center justify-start text-center px-6 sm:px-8 py-8 sm:py-10 relative">
          <Image
            src="/parents.png"
            alt="Feedback Icon"
            width={60}
            height={60}
            className="mb-4 w-12 h-12 sm:w-14 sm:h-14"
          />
          <h3 className="font-rowdies text-xl sm:text-2xl mb-2">
            03. Parents Feedback
          </h3>
          <p className="font-poppins text-sm sm:text-base md:text-lg max-w-xs">
            85% of Supersheldon parents agree their child is more confident.
          </p>
        </div>
      </div>

      {/* Floating Icons */}
      <div className="absolute bottom-6 left-4 sm:left-8 -translate-x-1/3 animate-float1 z-10 rotate-[45]">
        <img src="/icons/ribbon2.png" alt="globe" className="w-10 h-10 sm:w-[60px] sm:h-[60px]" />
      </div>
      <div className="absolute bottom-8 right-4 sm:right-6 animate-float2 z-10">
        <img src="/icons/30.png" alt="" className="w-10 h-10 sm:w-[60px] sm:h-[60px]" />
      </div>
      <div className="absolute top-4 left-12 sm:left-32 animate-float2 z-10">
        <img src="/icons/note2.png" alt="" className="w-10 h-10 sm:w-[60px] sm:h-[60px]" />
      </div>
      <div className="absolute top-4 right-12 sm:right-32 animate-float1 z-10">
        <img src="/icons/globe2.png" alt="" className="w-10 h-10 sm:w-[60px] sm:h-[60px]" />
      </div>

      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0) rotate(-45deg); }
          50% { transform: translateY(-12px) rotate(-45deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateX(0) rotate(45deg); }
          50% { transform: translateX(12px) rotate(45deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(10px); }
        }
        .animate-float1 { animation: float1 4s ease-in-out infinite; }
        .animate-float2 { animation: float2 5s ease-in-out infinite; }
        .animate-float3 { animation: float3 6s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default Review;
