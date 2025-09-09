// // "use client";

// // import { useState } from "react";
// // import GlossyButton from "./GlossyButton";
// // import Link from "next/link";

// // export default function Popup() {
// //   const [visible, setVisible] = useState(true);

// //   if (!visible) return null;

// //   return (
// //     <div className="fixed bottom-4 left-0 right-0 px-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-50">
// //       <div className="relative w-full max-w-2xl mx-auto shadow-xl rounded-2xl px-4 py-4 md:px-6 md:py-3 flex flex-col md:flex-row items-center bg-orange-100 justify-between gap-4 border border-gray-200">
        
// //         {/* Message */}
// //         <p className="text-sm md:text-base font-medium text-gray-800 text-center md:text-left">
// //           <span className="font-semibold text-gray-700">
// //             Hurry up!! Limited seats are available
// //           </span>
// //         </p>

// //         {/* Button */}

// //         <Link
// //       href="https://forms.gle/csc94GLG3tEDit6N6"
// //       target="_blank"
// //       rel="noopener noreferrer"
// //           ><GlossyButton>
// //             Book Now
// //           </GlossyButton>
// //         </Link>
// //         {/* <a href="#try a new class " className="shrink-0 w-full md:w-auto">
          
// //         </a> */}

// //         {/* Close Button */}
// //         <button
// //           onClick={() => setVisible(false)}
// //           className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
// //           aria-label="Close popup"
// //         >
// //           ×
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }



// "use client";

// import { useState } from "react";
// import GlossyButton from "./GlossyButton";
// import Link from "next/link";

// export default function Popup() {
//   const [visible, setVisible] = useState(true);

//   if (!visible) return null;

//   return (
//     <div className="fixed bottom-4 left-0 right-0 px-3 sm:px-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-50">
//       <div className="relative w-full max-w-2xl mx-auto shadow-xl rounded-2xl px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-3 flex flex-col md:flex-row items-center bg-orange-100 justify-between gap-3 sm:gap-4 border border-gray-200">
        
//         {/* Message */}
//         <p className="text-xs sm:text-sm md:text-base font-medium text-gray-800 text-center md:text-left leading-snug">
//           <span className="font-semibold text-gray-700">
//             Hurry up!! Limited seats are available
//           </span>
//         </p>

//         {/* Button */}
//         <div className="w-full sm:w-auto flex justify-center md:justify-end">
//           <Link
//             href="https://forms.gle/csc94GLG3tEDit6N6"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <GlossyButton className="px-4 py-2 text-sm sm:text-base">
//               Book Now
//             </GlossyButton>
//           </Link>
//         </div>

//         {/* Close Button */}
//         <button
//           onClick={() => setVisible(false)}
//           className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
//           aria-label="Close popup"
//         >
//           ×
//         </button>
//       </div>
//     </div>
//   );
// }







// "use client";

// import { useState } from "react";
// import GlossyButton from "./GlossyButton";
// import Link from "next/link";

// export default function Popup() {
//   const [visible, setVisible] = useState(true);

//   if (!visible) return null;

//   return (
//     <div className="fixed bottom-4 left-0 right-0 px-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-50">
//       <div className="relative w-full max-w-2xl mx-auto shadow-xl rounded-2xl px-4 py-4 md:px-6 md:py-3 flex flex-col sm:flex-row items-center bg-orange-100 justify-between gap-4 border border-gray-200">
        
//         {/* Message */}
//         <p className="text-sm sm:text-base font-medium text-gray-800 text-center sm:text-left">
//           <span className="font-semibold text-gray-700">
//             Hurry up!! Limited seats are available
//           </span>
//         </p>

//         {/* Button */}
//         <Link
//           href="https://forms.gle/csc94GLG3tEDit6N6"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="w-full sm:w-auto"
//         >
//           <GlossyButton>
//             Book Now
//           </GlossyButton>
//         </Link>

//         {/* Close Button */}
//         <button
//           onClick={() => setVisible(false)}
//           className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
//           aria-label="Close popup"
//         >
//           ×
//         </button>
//       </div>
//     </div>
//   );
// }









"use client";

import { useState } from "react";
import GlossyButton from "./GlossyButton";
import Link from "next/link";
import { useOpenDemoBooking } from "./utils/navigation";

export default function Popup() {
  const [visible, setVisible] = useState(true);
   const openDemoBooking = useOpenDemoBooking();

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-1 sm:p-2">
      <div className="relative w-full max-w-md mx-auto shadow-md rounded-lg px-3 py-2 flex items-center bg-orange-100 justify-between border border-orange-200 gap-2">
        
        {/* Message */}
        <p className="text-xs sm:text-sm font-semibold text-gray-800 flex-1 whitespace-nowrap overflow-hidden text-ellipsis pr-1">
          Hurry! Limited seats available
        </p>

        {/* Button */}
       
          <GlossyButton onClick={openDemoBooking} className="px-3 py-1 text-xs sm:text-sm">
            Book Now
          </GlossyButton>
        

        {/* Close Button */}
        <button
          onClick={() => setVisible(false)}
          className="flex-shrink-0 text-gray-500 hover:text-gray-700 text-lg w-5 h-5 flex items-center justify-center"
          aria-label="Close popup"
        >
          ×
        </button>
      </div>
    </div>
  );
}