







// "use client";
// import Image from "next/image";
// import GlossyButton from "../GlossyButton";
// import { useOpenDemoBooking } from "../utils/navigation";

// export default function TryFreeClass() {
//   const openDemoBooking = useOpenDemoBooking();

//   return (
//     <div className="flex flex-col items-center justify-center">
//       <div className="relative w-full max-w-6xl">
//         {/* Banner Image */}
//         <Image
//           src="/trybanner.png"
//           alt="Promo"
//           width={1200}
//           height={600}
//           className="w-full h-auto rounded-2xl"
//           priority
//         />

//         {/* Text Block (centered vertically in yellow box) */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] px-4 text-center">
//           <h2 className="text-white text-xl sm:text-2xl md:text-4xl font-bold leading-snug">
//             LearnQuest Demo Gateway
//           </h2>
//           <p className="text-white text-sm sm:text-base md:text-lg mt-2">
//             Start your adventure toward knowledge and success.
//           </p>
//         </div>

//         {/* Button (bottom center, still inside yellow box) */}
//         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[700px] text-center">
//           <GlossyButton onClick={openDemoBooking}>
//             Try a Free Class
//           </GlossyButton>
//         </div>
//       </div>
//     </div>
//   );
// }








"use client";
import Image from "next/image";
import GlossyButton from "../GlossyButton";
import { useOpenDemoBooking } from "../utils/navigation";

export default function TryFreeClass() {
  const openDemoBooking = useOpenDemoBooking();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-full max-w-5xl max-h-[450px] mx-auto">
        {/* Banner Image */}
        <Image
          src="/trybanner.png"
          alt="Promo"
          width={1000}
          height={450}
          className="w-full h-auto rounded-2xl object-contain"
          priority
        />

        {/* Text Block (centered vertically) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[650px] px-4 text-center">
          <h2 className="text-white text-lg sm:text-2xl md:text-3xl font-bold leading-snug">
            LearnQuest Demo Gateway
          </h2>
          <p className="text-white text-sm sm:text-base md:text-lg mt-2">
            Start your adventure toward knowledge and success.
          </p>
        </div>

        {/* Button (bottom center) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[650px] text-center">
          <GlossyButton onClick={openDemoBooking}>
            Try a Free Class
          </GlossyButton>
        </div>
      </div>
    </div>
  );
}
