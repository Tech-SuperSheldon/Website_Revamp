
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useOpenDemoBooking } from "../utils/navigation";
// import GlossyButton from "../GlossyButton";

// export default function UKCredits() {
//   return (
//     <section className="relative w-[95%] sm:w-[90%] mx-auto mt-8 md:-mt-8 sm:-mt-12 px-4 overflow-hidden">
//       {/* Pill background */}
//       <div className="w-full bg-[#E1E9FE] rounded-[9999px] py-10 px-6 sm:px-12 mb-12 shadow-md relative z-10">
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 items-center text-center justify-center">

//           {/* 1. Trusted Feedback */}
//           <div className="flex flex-col items-center justify-center space-y-5 break-words w-full">
//             <p className="text-xl sm:text-2xl font-semibold break-words w-full">Trusted Feedback</p>
//             <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-10 w-full">
//               {/* Trustpilot */}
//               <div className="flex flex-col items-center max-w-[120px] w-full">
//                 <Image
//                   src="/trustpilot.png"
//                   alt="Trustpilot"
//                   width={110}
//                   height={110}
//                   className="object-contain h-auto max-w-full"
//                 />
//                 <p className="text-sm sm:text-base text-[#4E5566] mt-2 break-words w-full text-center">
//                   TrustScore 4.9 (395 reviews)
//                 </p>
//               </div>

//               {/* Google */}
//               <div className="flex flex-col items-center max-w-[120px] w-full">
//                 <Image
//                   src="/googlev2.png"
//                   alt="Google Reviews"
//                   width={120}
//                   height={120}
//                   className="object-contain h-auto max-w-full"
//                 />
//                 <p className="text-sm sm:text-base text-[#4E5566] mt-2 break-words w-full text-center">
//                   278 reviews
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* 2. Accredited By */}
//           <div className="flex flex-col items-center justify-center space-y-3 break-words w-full">
//             <p className="text-xl sm:text-2xl font-semibold break-words w-full">Accredited by</p>
//             <Image
//               src="/Stem.png"
//               alt="STEM Accredited"
//               width={160}
//               height={90}
//               className="object-contain h-auto max-w-full"
//             />
//           </div>

//           {/* 3. 80% Confidence */}
//           <div className="flex flex-col items-center justify-center space-y-3 break-words w-full">
//             <p className="text-[#1D2026] font-semibold text-lg sm:text-xl leading-snug text-center break-words w-full">
//               80% learners show  <br/>increased &nbsp; 
//               <br className="hidden sm:block" />
//                  confidence in 
//               <br/>2 weeks
//             </p>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }





"use client";

import Image from "next/image";
import Link from "next/link";
import { useOpenDemoBooking } from "../utils/navigation";
import GlossyButton from "../GlossyButton";

export default function UKCredits() {
  return (
    <section className="relative w-[95%] sm:w-[90%] mx-auto mt-8 md:-mt-8 sm:-mt-12 px-4 overflow-hidden">
      {/* Pill background */}
      <div className="w-full bg-[#E1E9FE] rounded-[9999px] py-10 px-6 sm:px-12 mb-12 shadow-md relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 items-center text-center justify-center">

          {/* 1. Trusted Feedback */}
          <div className="flex flex-col items-center justify-center space-y-5 break-words w-full">
            <p className="text-xl sm:text-2xl font-semibold break-words w-full">Trusted Feedback</p>
            <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-10 w-full">
              
              {/* Trustpilot */}
              <div className="flex flex-col items-center max-w-[120px] w-full">
                <Link
                  href="https://www.trustpilot.com/review/supersheldon.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/trustpilot.png"
                    alt="Trustpilot"
                    width={110}
                    height={110}
                    className="object-contain h-auto max-w-full hover:scale-105 transition-transform duration-200"
                  />
                </Link>
                <p className="text-sm sm:text-base text-[#4E5566] mt-2 break-words w-full text-center">
                  TrustScore 4.5 (42 reviews)
                </p>
              </div>

              {/* Google */}
              <div className="flex flex-col items-center max-w-[120px] w-full">
                <Link
                  href="https://g.page/r/CaTkfHipd4dCEAI/review"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/googlev2.png"
                    alt="Google Reviews"
                    width={120}
                    height={120}
                    className="object-contain h-auto max-w-full hover:scale-105 transition-transform duration-200"
                  />
                </Link>
                <p className="text-sm sm:text-base text-[#4E5566] mt-2 break-words w-full text-center">
                  30 reviews
                </p>
              </div>
            </div>
          </div>

          {/* 2. Accredited By */}
          <div className="flex flex-col items-center justify-center space-y-3 break-words w-full">
            <p className="text-xl sm:text-2xl font-semibold break-words w-full">Accredited by</p>
            <Image
              src="/Stem.png"
              alt="STEM Accredited"
              width={160}
              height={90}
              className="object-contain h-auto max-w-full"
            />
          </div>

          {/* 3. 80% Confidence */}
          <div className="flex flex-col items-center justify-center space-y-3 break-words w-full">
            <p className="text-[#1D2026] font-semibold text-lg sm:text-xl leading-snug text-center break-words w-full">
              80% learners show  <br/>increased &nbsp; 
              <br className="hidden sm:block" />
                 confidence in 
              <br/>2 weeks
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
