

// "use client";
// import Image from "next/image";

// export default function UKHero() {
//   return (
//     <div className="w-full flex flex-col items-center relative">
//       {/* Hero Section */}
//       <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
//         {/* Background Image */}
//         <Image
//           src="/UK/bg1.png"
//           alt="Background"
//           fill
//           className="object-cover"
//           priority
//         />

//         {/* Foreground Banner Image */}
//         <div className="relative z-10 w-[92%] max-w-[1600px] mx-auto rounded-3xl overflow-hidden shadow-2xl">
//           <div className="w-full aspect-[16/9] sm:aspect-[21/9]">
//             <Image
//               src="/UK/UKhero.png"
//               alt="Banner"
//               fill
//               className="rounded-3xl object-cover"
//               priority
//             />
//           </div>
//         </div>
//       </div>

//       {/* Pills Section */}
//       <div className="w-full flex justify-center mt-0 sm:mt-0 relative -translate-y-1/5">
//         <div className="flex justify-between w-[85%] sm:w-[75%] md:w-[65%] max-w-[1100px] px-2 sm:px-6">
//           {/* Left Pill */}
//           <div className="relative w-[34%] sm:w-[28%] md:w-[22%] lg:w-[18%] aspect-[2/5]">
//             <Image
//               src="/UK/p2.png"
//               alt="Left Pill"
//               fill
//               className="rounded-full shadow-lg object-cover"
//             />
//           </div>
//           {/* Right Pill */}
//           <div className="relative w-[34%] sm:w-[28%] md:w-[22%] lg:w-[18%] aspect-[2/5]">
//             <Image
//               src="/UK/p1.png"
//               alt="Right Pill"
//               fill
//               className="rounded-full shadow-lg object-cover"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }









"use client";
import Image from "next/image";

export default function UKHero() {
  return (
    <div className="w-full flex flex-col items-center relative">
      {/* Hero Section */}
      <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/UK/bg1.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />

        {/* Foreground Banner Image */}
        <div className="relative z-10 w-[92%] max-w-[1600px] mx-auto rounded-3xl overflow-hidden shadow-2xl">
          <div className="w-full aspect-[16/9] sm:aspect-[21/9]">
            <Image
              src="/UK/UKhero.png"
              alt="Banner"
              fill
              className="rounded-3xl object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Images Section */}
      <div className="w-full flex justify-center relative overflow-visible -translate-y-1/5">
        <div className="flex justify-between w-[85%] sm:w-[75%] md:w-[65%] max-w-[1100px] px-2 sm:px-6 overflow-visible">
          {/* Left Image */}
          <div className="relative w-[34%] sm:w-[28%] md:w-[22%] lg:w-[18%] aspect-[2/5] overflow-visible translate-y-[-20%]">
            <Image
              src="/UK/p2.png"
              alt="Left Image"
              fill
              className="rounded-full shadow-lg object-cover"
            />
          </div>
          {/* Right Image */}
          <div className="relative w-[34%] sm:w-[28%] md:w-[22%] lg:w-[18%] aspect-[2/5] overflow-visible translate-y-[-10%]">
            <Image
              src="/UK/p1.png"
              alt="Right Image"
              fill
              className="rounded-full shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
