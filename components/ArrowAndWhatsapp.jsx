// "use client";

// import { useEffect, useState } from "react";
// import { FaWhatsapp } from "react-icons/fa";

// export default function FloatingArrowWhatsApp() {
//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setShow(true), 200);
//     return () => clearTimeout(timer);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div
//       className={`fixed right-6 bottom-6 z-50 flex flex-col items-center gap-3 transition-all duration-500 ${
//         show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//       }`}
//     >
//       {/* Scroll to top button (orange) */}
//       <button
//         onClick={scrollToTop}
//         className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 shadow-lg ring-1 ring-black/10 transition-transform hover:-translate-y-2 hover:scale-105"
//         title="Back to top"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={2.2}
//           stroke="white"
//           className="h-7 w-7"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
//         </svg>
//       </button>

//       {/* WhatsApp button (green) */}
//       <button
//         onClick={() =>
//           window.open(
//             "https://api.whatsapp.com/send/?phone=917974695618&text&type=phone_number&app_absent=0", // replace with your number/message
//             "_blank"
//           )
//         }
//         className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-lg transition-transform hover:-translate-y-2 hover:scale-105"
//         title="WhatsApp"
//       >
//         <FaWhatsapp className="h-7 w-7 text-white" />
//       </button>
//     </div>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingArrowWhatsApp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed right-3 bottom-3 md:right-6 md:bottom-6 z-50 flex flex-col items-center gap-2 md:gap-3 transition-all duration-500 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Scroll to top button (orange) */}
      <button
        onClick={scrollToTop}
        className="flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full bg-orange-500 shadow-lg ring-1 ring-black/10 transition-transform hover:-translate-y-2 hover:scale-105"
        title="Back to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.2}
          stroke="white"
          className="h-5 w-5 md:h-7 md:w-7"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* WhatsApp button (green) */}
      <button
        onClick={() =>
          window.open(
            "https://api.whatsapp.com/send/?phone=917974695618&text&type=phone_number&app_absent=0",
            "_blank"
          )
        }
        className="flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full bg-green-500 shadow-lg transition-transform hover:-translate-y-2 hover:scale-105"
        title="WhatsApp"
      >
        <FaWhatsapp className="h-5 w-5 md:h-7 md:w-7 text-white" />
      </button>
    </div>
  );
}
