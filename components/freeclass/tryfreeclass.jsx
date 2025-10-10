






// "use client";
// import Image from "next/image";
// import GlossyButton from "../GlossyButton";
// import { useOpenDemoBooking } from "../utils/navigation";

// export default function TryFreeClass() {
//   const openDemoBooking = useOpenDemoBooking();

//   return (
//     <div className="flex flex-col items-center justify-center">
//       <div className="relative w-full max-w-5xl max-h-[450px] mx-auto">
//         {/* Banner Image */}
//         <Image
//           src="/trybanner.png"
//           alt="Promo"
//           width={1000}
//           height={450}
//           className="w-full h-auto rounded-2xl object-contain"
//           priority
//         />

//         {/* Text Block (centered vertically) */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[650px] px-4 text-center">
//           <h2 className="text-white text-lg sm:text-2xl md:text-3xl font-bold leading-snug">
//             LearnQuest Demo Gateway
//           </h2>
//           <p className="text-white text-sm sm:text-base md:text-lg mt-2">
//             Start your adventure toward knowledge and success.
//           </p>
//         </div>

//         {/* Button (bottom center) */}
//         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[650px] text-center">
//           <GlossyButton onClick={openDemoBooking}>
//             Try a Free Class
//           </GlossyButton>
//         </div>
//       </div>
//     </div>
//   );
// }





// "use client";
// import Image from "next/image";
// import GlossyButton from "../GlossyButton";
// import { useOpenDemoBooking } from "../utils/navigation";

// export default function TryFreeClass() {
//   const openDemoBooking = useOpenDemoBooking();

//   return (
//     <section className="relative flex flex-col sm:justify-center items-center w-full max-w-5xl mx-auto mt-12 px-4">
//       {/* 🧾 Text & Button (mobile view) */}
//       <div className="flex flex-col items-center justify-center text-center sm:hidden z-10 -mb-6">
//         <h2 className="text-[#1D2026] text-xl font-bold leading-snug">
//           LearnQuest Demo Gateway
//         </h2>
//         <p className="text-[#4E5566] text-sm mt-2">
//           Start your adventure toward knowledge and success.
//         </p>
//         <div className="mt-3">
//           <GlossyButton onClick={openDemoBooking}>Try a Free Class</GlossyButton>
//         </div>
//       </div>

//       {/* 🖼 Banner Image (shared for all screens) */}
//       <div className="relative w-full">
//         <Image
//           src="/trybanner.png"
//           alt="Promo"
//           width={1000}
//           height={450}
//           className="w-full h-auto rounded-2xl object-contain"
//           priority
//         />

//         {/* 🧾 Text & Button (desktop/tablet view) */}
//         <div className="hidden sm:flex flex-col items-center justify-center text-center absolute inset-0 px-4">
//           <h2 className="text-white text-2xl md:text-3xl font-bold leading-snug">
//             LearnQuest Demo Gateway
//           </h2>
//           <p className="text-white text-base md:text-lg mt-2">
//             Start your adventure toward knowledge and success.
//           </p>
//           <div className="mt-4">
//             <GlossyButton onClick={openDemoBooking}>Try a Free Class</GlossyButton>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }






// "use client";
// import Image from "next/image";
// import GlossyButton from "../GlossyButton";
// import { useOpenDemoBooking } from "../utils/navigation";

// export default function TryFreeClass() {
//   const openDemoBooking = useOpenDemoBooking();

//   return (
//     <section className="relative w-full flex justify-center mb-16 mt-10">
//       {/* 🟨 Gradient Banner Box */}
//       <div className="bg-gradient-to-r from-[#FFC904] to-[#FFA515] rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between 
//         w-[95%] sm:w-[80%] md:w-[70%] lg:w-[65%] px-4 sm:px-6 py-4 sm:py-3 text-center sm:text-left overflow-hidden">
        
//         {/* 🖼 Left Image */}
//         <div className="hidden sm:flex items-end justify-center w-1/4">
//           <Image
//             src="/g1.png" // ⬅️ replace with your left image
//             alt="Left Banner"
//             width={200}
//             height={200}
//             className="object-contain w-auto h-[140px] sm:h-[160px] md:h-[180px] -mb-2"
//           />
//         </div>

//         {/* 🧾 Text & Button */}
//         <div className="flex flex-col items-center justify-center sm:w-1/2 w-full py-2 sm:py-0">
//           <h2 className="text-white text-base sm:text-lg md:text-xl font-semibold leading-snug">
//             LearnQuest Demo Gateway
//           </h2>
//           <p className="text-white text-xs sm:text-sm mt-1">
//             Start your adventure toward knowledge and success.
//           </p>
//           <div className="mt-3">
//             <GlossyButton onClick={openDemoBooking}>
//               Try a Free Class
//             </GlossyButton>
//           </div>
//         </div>

//         {/* 🖼 Right Image */}
//         <div className="hidden sm:flex items-end justify-center w-1/4">
//           <Image
//             src="/g2.png" // ⬅️ replace with your right image
//             alt="Right Banner"
//             width={200}
//             height={200}
//             className="object-contain w-auto h-[140px] sm:h-[160px] md:h-[180px] -mb-2"
//           />
//         </div>

//         {/* 📱 Mobile Images (Below Text) */}
//         <div className="flex sm:hidden w-full items-end justify-center gap-4 mt-4">
//           <Image
//             src="/g1.png"
//             alt="Left Banner Mobile"
//             width={160}
//             height={160}
//             className="object-contain h-[110px] -mb-2"
//           />
//           <Image
//             src="/g2.png"
//             alt="Right Banner Mobile"
//             width={160}
//             height={160}
//             className="object-contain h-[110px] -mb-2"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }




"use client";
import Image from "next/image";
import GlossyButton from "../GlossyButton";
import { useOpenDemoBooking } from "../utils/navigation";

export default function TryFreeClass() {
  const openDemoBooking = useOpenDemoBooking();

  return (
    <section className="relative w-full flex mb-24 justify-center mt-10">
      {/* 🟨 Gradient Banner Box */}
      <div
        className="bg-gradient-to-r from-[#FFC904] to-[#FFA515] rounded-2xl shadow-md 
        flex flex-col sm:flex-row items-center justify-between 
        w-[95%] sm:w-[80%] md:w-[70%] lg:w-[65%] 
        px-4 sm:px-6 py-4 sm:py-3 
        text-center sm:text-left overflow-hidden"
      >
        {/* 🖼 Left Image */}
        <div className="hidden sm:flex items-end justify-center w-1/4">
          <Image
            src="/g1.png" // ⬅️ replace with your left image
            alt="Left Banner"
            width={250}
            height={250}
            className="object-contain w-auto h-[170px] sm:h-[190px] md:h-[210px] -mb-2"
          />
        </div>

        {/* 🧾 Text & Button */}
        <div className="flex flex-col items-center justify-center sm:w-1/2 w-full py-2 sm:py-0">
          <h2 className="text-white text-base text-lg sm:text-xl md:text-2xl font-semibold leading-snug">
            LearnQuest Demo Gateway
          </h2>
          <p className="text-white text-sm sm:text-lg mt-1">
            Start your adventure toward knowledge and success.
          </p>
          <div className="mt-3">
            <GlossyButton onClick={openDemoBooking}>
              Try a Free Class
            </GlossyButton>
          </div>
        </div>

        {/* 🖼 Right Image */}
        <div className="hidden sm:flex items-end justify-center w-1/4">
          <Image
            src="/g2.png" // ⬅️ replace with your right image
            alt="Right Banner"
            width={250}
            height={250}
            className="object-contain w-auto h-[170px] sm:h-[190px] md:h-[210px] -mb-2"
          />
        </div>

        {/* 📱 Mobile Images (Below Text) */}
        <div className="flex sm:hidden w-full items-end justify-center gap-4 sm:-mb-4 -mb-2 mt-4">
          <Image
            src="/g1.png"
            alt="Left Banner Mobile"
            width={180}
            height={180}
            className="object-contain h-[130px] sm:-mb-2 -mb-2"
          />
          <Image
            src="/g2.png"
            alt="Right Banner Mobile"
            width={180}
            height={180}
            className="object-contain h-[130px] -mb-2"
          />
        </div>
      </div>
    </section>
  );
}
