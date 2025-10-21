// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import GlossyButton from "./GlossyButton"; 
// import { useOpenDemoBooking } from "./utils/navigation";

// const SubscribeSection = () => {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const openDemoBooking = useOpenDemoBooking();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
//       setError("Please enter a valid email address");
//       return;
//     }
//     setError("");
//     openDemoBooking();
//   };

//   return (
//     <section
//       id="try-a-free-class"
//       className="relative mx-auto w-[90%] mt-4 mb-4 rounded-2xl overflow-hidden text-white font-poppins flex items-center justify-center h-[370px] bg-[#4D2C5E]"
//     >
//       {/* Content */}
//       <div className="relative z-10 flex flex-col items-center text-center max-w-xl">
//         <h2 className="text-3xl md:text-4xl font-semibold mb-4">Subscribe to Supersheldon</h2>
//         <p className="mb-6 text-base md:text-lg">
//           Stay ahead with the latest courses, exam tips, and free learning resources.
//         </p>

//         {/* Email + Button with inline alert */}
//         <form onSubmit={handleSubmit} className="relative w-full max-w-md">
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className={`w-full rounded-full py-4 px-6 text-gray-800 outline-none shadow-lg pr-40 ${
//               error ? "border-2 border-red-500" : ""
//             }`}
//           />
//           <div className="absolute top-1/2 right-2 -translate-y-1/2">
//             <GlossyButton type="submit" className="px-4 py-2 rounded-full text-sm">
//               Try a free Class
//             </GlossyButton>
//           </div>
//           {/* Error text inside form */}
//           {error && <p className="absolute left-4 -bottom-6 text-red-400 text-sm">{error}</p>}
//         </form>
//       </div>
//     </section>
//   );
// };

// export default SubscribeSection;








"use client";
import React, { useState } from "react";
import GlossyButton from "./GlossyButton"; 
import { useOpenDemoBooking } from "./utils/navigation";

const SubscribeSection = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const openDemoBooking = useOpenDemoBooking();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    openDemoBooking();
  };

  return (
    <section
      id="try-a-free-class"
      className="relative mx-auto w-[90%] mt-4 mb-4 rounded-2xl overflow-hidden text-white font-poppins flex items-center justify-center h-[370px] bg-[#4D2C5E]"
    >
      {/* Top-left crossing circles forming a sharp ellipse */}
      <div className="absolute top-0 left-0 border-4 border-white rounded-full w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 -translate-x-1/3 -translate-y-1/2"></div>
      <div className="absolute top-0 left-0 border-4 border-white rounded-full w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 -translate-x-1/2 -translate-y-1/3"></div>

      {/* Top-right crossing circles forming a sharp ellipse */}
      <div className="absolute top-0 right-0 border-4 border-white rounded-full w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 translate-x-1/3 -translate-y-1/2"></div>
      <div className="absolute top-0 right-0 border-4 border-white rounded-full w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 translate-x-1/2 -translate-y-1/3"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">Subscribe to Supersheldon</h2>
        <p className="mb-6 text-base md:text-lg">
          Stay ahead with the latest courses, exam tips, and free learning resources.
        </p>

        {/* Email + Button with inline alert */}
        <form onSubmit={handleSubmit} className="relative w-full max-w-md">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full rounded-full py-4 px-6 text-gray-800 outline-none shadow-lg pr-40 ${
              error ? "border-2 border-red-500" : ""
            }`}
          />
          <div className="absolute top-1/2 right-2 -translate-y-1/2">
            <GlossyButton type="submit" className="px-4 py-2 rounded-full text-sm">
              Try a free Class
            </GlossyButton>
          </div>
          {error && <p className="absolute left-4 -bottom-6 text-red-400 text-sm">{error}</p>}
        </form>
      </div>
    </section>
  );
};

export default SubscribeSection;
