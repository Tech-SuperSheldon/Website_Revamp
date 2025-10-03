
// // "use client";

// // import Image from "next/image";
// // import Link from "next/link";
// // import GlossyButton from "./GlossyButton";

// // export default function Credits() {
// //   return (
// //     <section className="relative w-[95%] sm:w-[90%] mx-auto -mt-32 px-4 overflow-hidden">
// //       {/* Pill background */}
// //       <div className="w-full bg-[#EDE8E1] rounded-[9999px] py-6 px-4 sm:px-10 shadow-md relative z-10">
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch text-center">
          
// //           {/* Trusted Feedback */}
// //           <div className="flex flex-col items-center justify-between space-y-3">
// //             <p className="text-xl font-semibold font-medium">Trusted Feedback</p>
// //             <div className="flex items-start justify-center gap-6">
// //               {/* Trustpilot */}
// //               <div className="flex flex-col items-center">
// //                 <Image
// //                   src="/trustpilot.png"
// //                   alt="Trustpilot"
// //                   width={80}
// //                   height={80}
// //                   className="object-contain"
// //                 />
// //                 <p className="text-xs text-[#4E5566] mt-1">TrustScore 4.9 (395 reviews)</p>
// //               </div>

// //               {/* Google */}
// //               <div className="flex flex-col items-center">
// //                 <Image
// //                   src="/google.png"
// //                   alt="Google Reviews"
// //                   width={80}
// //                   height={80}
// //                   className="object-contain"
// //                 />
// //                 <p className="text-xs text-[#4E5566] mt-1">278 reviews</p>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Accredited By */}
// //           <div className="flex flex-col items-center space-y-3">
// //             <p className="text-xl font-semibold font-medium">Accredited by</p>
// //             <Image
// //               src="/Stem.png"
// //               alt="STEM Accredited"
// //               width={120}
// //               height={60}
// //               className="object-contain"
// //             />
// //           </div>

// //           {/* Built By Alumni */}
// //           <div className="flex flex-col items-center space-y-3">
// //             <p className="text-xl font-semibold font-medium">Built by alumni of</p>
// //             <Image
// //               src="/Messa.png"
// //               alt="Mesa School of Business"
// //               width={120}
// //               height={60}
// //               className="object-contain"
// //             />
// //           </div>

// //           <div className="flex flex-col items-center justify-center space-y-3">
// //             <p className="text-[#1D2026] font-semibold text-xl sm:text-md leading-snug">
// //               80% learners show Exam<br />increased confidence in 2 weeks
// //             </p>
// //           </div>
// //         </div>

// //         {/* Bottom flex row */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-sm sm:text-md text-[#4E5566] mt-2 text-center">
// //           <p className="invisible">Placeholder</p>
// //           <p>Educational Experience</p>
// //           <p>Mesa School of Business</p>
// //           <p className="invisible">Placeholder</p>
// //         </div>
// //       </div>

// //       {/* White gradient overlay */}
// //       <div className="absolute bottom-0 left-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />

// //       <div className="text-center mx-auto mt-8 relative z-20 mb-2">
// //         <Link
// //       href="https://forms.gle/csc94GLG3tEDit6N6"
// //       target="_blank"
// //       rel="noopener noreferrer"
// //           ><GlossyButton>
// //             Try a free Class
// //           </GlossyButton>
// //         </Link>
// //       </div>
// //     </section>
// //   );
// // }




// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import GlossyButton from "./GlossyButton";

// export default function Credits() {
//   return (
//     <section className="relative w-[95%] sm:w-[90%] mx-auto -mt-24 px-4 overflow-hidden">
//       {/* Pill background */}
//       <div className="w-full bg-[#EDE8E1] rounded-[9999px] py-8 px-6 sm:px-10 shadow-md relative z-10">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch text-center">
          
//           {/* Trusted Feedback */}
//           <div className="flex flex-col items-center justify-between space-y-4">
//             <p className="text-lg sm:text-xl font-semibold">Trusted Feedback</p>
//             <div className="flex items-start justify-center gap-6 flex-wrap">
//               {/* Trustpilot */}
//               <div className="flex flex-col items-center">
//                 <Image
//                   src="/trustpilot.png"
//                   alt="Trustpilot"
//                   width={70}
//                   height={70}
//                   className="object-contain max-w-[80px] h-auto"
//                 />
//                 <p className="text-xs sm:text-sm text-[#4E5566] mt-1">
//                   TrustScore 4.9 (395 reviews)
//                 </p>
//               </div>

//               {/* Google */}
//               <div className="flex flex-col mt-1 items-center">
//                 <Image
//                   src="/googlev2.png"
//                   alt="Google Reviews"
//                   width={70}
//                   height={70}
//                   className="object-contain max-w-[80px] h-auto"
//                 />
//                 <p className="text-xs sm:text-sm text-[#4E5566] mt-1">
//                   278 reviews
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Accredited By */}
//           <div className="flex flex-col items-center space-y-3">
//             <p className="text-lg sm:text-xl font-semibold">Accredited by</p>
//             <Image
//               src="/Stem.png"
//               alt="STEM Accredited"
//               width={120}
//               height={60}
//               className="object-contain max-w-[100px] sm:max-w-[120px] h-auto"
//             />
//           </div>

//           {/* Built By Alumni */}
//           {/* <div className="flex flex-col items-center space-y-3">
//             <p className="text-lg sm:text-xl font-semibold">Built by alumni of</p>
//             <Image
//               src="/Messa.png"
//               alt="Mesa School of Business"
//               width={120}
//               height={60}
//               className="object-contain max-w-[100px] sm:max-w-[120px] h-auto"
//             />
//           </div> */}

//           {/* Confidence Statement */}
//           <div className="flex flex-col items-center justify-center space-y-3">
//             <p className="text-[#1D2026] font-semibold text-lg sm:text-xl leading-snug">
//               80% learners show Exam
//               <br className="hidden sm:block" />
//               increased confidence in 2 weeks
//             </p>
//           </div>
//         </div>

//         {/* Bottom flex row */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 text-xs sm:text-sm md:text-base text-[#4E5566] mt-4 text-center gap-2">
//           <p className="hidden lg:block">Placeholder</p>
//           <p>Educational Experience</p>
//           {/* <p>Mesa School of Business</p> */}
//           <p className="hidden lg:block"></p>
//         </div>
        
//       </div>

//       {/* White gradient overlay */}
//       {/* <div className="absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-white to-transparent pointer-events-none" /> */}

//       {/* CTA Button */}
//       <div className="text-center mx-auto mt-8 relative z-20 mb-2">
//         <Link
//           href="https://forms.gle/csc94GLG3tEDit6N6"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <GlossyButton>Try a free Class</GlossyButton>
//         </Link>
//       </div>
//     </section>
//   );
// }





// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import GlossyButton from "./GlossyButton";

// export default function Credits() {
//   return (
//     <section className="relative w-[95%] sm:w-[90%] mx-auto -mt-24 px-4 overflow-hidden">
//       {/* Pill background */}
//       <div className="w-full bg-[#EDE8E1] rounded-[9999px] py-8 px-6 sm:px-10 shadow-md relative z-10">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch text-center">
          
//           {/* Trusted Feedback */}
//           <div className="flex flex-col items-center justify-between space-y-4">
//             <p className="text-lg sm:text-xl font-semibold">Trusted Feedback</p>
//             <div className="flex items-start justify-center gap-6 flex-wrap">
//               {/* Trustpilot */}
//               <div className="flex flex-col items-center">
//                 <Image
//                   src="/trustpilot.png"
//                   alt="Trustpilot"
//                   width={70}
//                   height={70}
//                   className="object-contain max-w-[80px] h-auto"
//                 />
//                 <p className="text-xs sm:text-sm text-[#4E5566] mt-1">
//                   TrustScore 4.9 (395 reviews)
//                 </p>
//               </div>

//               {/* Google */}
//               <div className="flex flex-col mt-1 items-center">
//                 <Image
//                   src="/googlev2.png"
//                   alt="Google Reviews"
//                   width={140}
//                   height={140}
//                   className="object-contain max-w-[80px] h-auto"
//                 />
//                 <p className="text-xs sm:text-sm text-[#4E5566] mt-1">
//                   278 reviews
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Accredited By */}
//           <div className="flex flex-col items-center space-y-3">
//             <p className="text-lg sm:text-xl font-semibold">Accredited by</p>
//             <Image
//               src="/Stem.png"
//               alt="STEM Accredited"
//               width={120}
//               height={60}
//               className="object-contain max-w-[100px] sm:max-w-[120px] h-auto"
//             />
//           </div>

//           {/* Confidence Statement */}
//           <div className="flex flex-col items-center justify-center space-y-3">
//             <p className="text-[#1D2026] font-semibold text-lg sm:text-xl leading-snug">
//               80% learners show Exam
//               <br className="hidden sm:block" />
//               increased confidence in 2 weeks
//             </p>
//           </div>
//         </div>

//         {/* Bottom flex row */}
//         {/* <div className="grid grid-cols-1 sm:grid-cols-3 text-xs sm:text-sm md:text-base text-[#4E5566] mt-4 text-center gap-2">
//           <p>Educational Experience</p>
//         </div> */}
//       </div>

//       {/* CTA Button */}
//       <div className="text-center mx-auto mt-8 relative z-20 mb-2">
//         <Link
//           href="https://forms.gle/csc94GLG3tEDit6N6"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <GlossyButton>Try a free Class</GlossyButton>
//         </Link>
//       </div>
//     </section>
//   );
// }


"use client";

import Image from "next/image";
import Link from "next/link";
import GlossyButton from "./GlossyButton";
import { useOpenDemoBooking } from "./utils/navigation";

export default function Credits() {
  return (
    <section className="relative w-[95%] sm:w-[90%] mx-auto -mt-20 px-4 overflow-hidden">
      {/* Pill background */}
      <div className="w-full bg-[#EDE8E1] rounded-[9999px] py-10 px-8 sm:px-12 shadow-md relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 items-center text-center justify-center">
          
          {/* 1. Trusted Feedback */}
          <div className="flex flex-col items-center justify-center space-y-5">
            <p className="text-xl sm:text-2xl font-semibold">Trusted Feedback</p>
            <div className="flex items-start justify-center gap-10 ">
              {/* Trustpilot */}
              <div className="flex flex-col items-center">
                <Image
                  src="/trustpilot.png"
                  alt="Trustpilot"
                  width={110}
                  height={110}
                  className="object-contain h-auto"
                />
                <p className="text-sm sm:text-base text-[#4E5566] mt-2">
                  TrustScore 4.9 (395 reviews)
                </p>
              </div>

              {/* Google */}
              <div className="flex flex-col items-center">
                <Image
                  src="/googlev2.png"
                  alt="Google Reviews"
                  width={120}
                  height={120}
                  className="object-contain h-auto"
                />
                <p className="text-sm sm:text-base text-[#4E5566] mt-2">
                  278 reviews
                </p>
              </div>
            </div>
          </div>

          {/* 2. Accredited By */}
          <div className="flex flex-col items-center justify-center space-y-3">
            <p className="text-xl sm:text-2xl font-semibold">Accredited by</p>
            <Image
              src="/Stem.png"
              alt="STEM Accredited"
              width={160}
              height={90}
              className="object-contain h-auto"
            />
          </div>

          {/* 3. 80% Confidence */}
          <div className="flex flex-col items-center justify-center space-y-3">
            <p className="text-[#1D2026] font-semibold text-lg sm:text-xl leading-snug text-center">
              80% learners show increased 
              <br className="hidden sm:block" />
               confidence in 2 weeks
            </p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      {/* <div className="text-center mx-auto mt-10 relative z-20 mb-2">
        
          <GlossyButton onClick={useOpenDemoBooking()}>Try a free Class</GlossyButton>
        
      </div> */}
    </section>
  );
}
