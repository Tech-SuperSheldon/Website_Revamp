
// "use client";
// import Image from "next/image";
// import GlossyButton from "../GlossyButton";
// import { useOpenDemoBooking } from "../utils/navigation";

// export default function TryFreeClass() {
//   const openDemoBooking = useOpenDemoBooking();

//   return (
//     <section className="relative w-full flex mb-24 justify-center mt-10">
//       {/* 🟨 Gradient Banner Box */}
//       <div
//         className="bg-gradient-to-r from-[#FFC904] to-[#FFA515] rounded-2xl shadow-md 
//         flex flex-col sm:flex-row items-center justify-between 
//         w-[95%] sm:w-[80%] md:w-[70%] lg:w-[65%] 
//         px-4 sm:px-6 py-4 sm:py-3 
//         text-center sm:text-left overflow-hidden"
//       >
//         {/* 🖼 Left Image */}
//         <div className="hidden sm:flex items-end justify-center w-1/4">
//           <Image
//             src="/g1.png" //
//             alt="Left Banner"
//             width={250}
//             height={250}
//             className="object-contain w-auto h-[170px] sm:scale-100 scale-[1.2] sm:h-[190px] md:h-[210px] -mb-2"
//           />
//         </div>

//         {/* 🧾 Text & Button */}
//         <div className="flex flex-col items-center justify-center sm:w-1/2 w-full py-2 sm:py-0">
//           <h2 className="text-white text-base text-lg sm:text-xl md:text-2xl font-semibold leading-snug">
//             LearnQuest Demo Gateway
//           </h2>
//           <p className="text-white text-sm sm:text-lg mt-1">
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
//             src="/g2.png"
//             alt="Right Banner"
//             width={250}
//             height={250}
//             className="object-contain w-auto h-[170px] sm:h-[190px] md:h-[210px] -mb-2"
//           />
//         </div>

//         {/* 📱 Mobile Images (Below Text) */}
//         <div className="flex sm:hidden w-full items-end justify-center gap-4 sm:-mb-4 -mb-2 mt-4">
//           <Image
//             src="/g1.png"
//             alt="Left Banner Mobile"
//             width={180}
//             height={180}
//             className="object-contain h-[130px] sm:-mb-2 -mb-2"
//           />
//           <Image
//             src="/g2.png"
//             alt="Right Banner Mobile"
//             width={180}
//             height={180}
//             className="object-contain h-[130px] -mb-2"
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
        {/* 🖼 Left Image (Desktop) */}
        <div className="hidden sm:flex items-end justify-center w-1/4">
          <Image
            src="/g1.png"
            alt="Left Banner"
            width={250}
            height={250}
            className="object-contain w-auto h-[170px] sm:scale-100 scale-[1.2] sm:h-[190px] md:h-[210px] -mb-2"
          />
        </div>

        {/* 🧾 Text & Button */}
        <div className="flex flex-col items-center justify-center sm:w-1/2 w-full py-2 sm:py-0">
          <h2 className="text-white text-base text-lg sm:text-xl md:text-2xl font-semibold leading-snug">
            Book your demo now
          </h2>
          <p className="text-white text-sm sm:text-lg mt-1">
            Book a free demo right now and join our SuperSheldon family.
          </p>
          <div className="mt-3">
            <GlossyButton onClick={openDemoBooking}>Try a Free Class</GlossyButton>
          </div>
        </div>

        {/* 🖼 Right Image (Desktop) */}
        <div className="hidden sm:flex items-end justify-center w-1/4">
          <Image
            src="/g2.png"
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
            width={200}
            height={200}
            className="object-contain h-[150px] sm:-mb-2 -mb-2 scale-[1.2]"
          />
          <Image
            src="/g2.png"
            alt="Right Banner Mobile"
            width={200}
            height={200}
            className="object-contain h-[150px] -mb-2 scale-[1.2]"
          />
        </div>
      </div>
    </section>
  );
}
