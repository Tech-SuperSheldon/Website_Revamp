// "use client";

// import { motion } from "framer-motion";
// import { User, Code, Search, Database, CheckCircle2, Loader2, Zap, BarChart } from "lucide-react";
// import React, { useMemo } from "react";

// // Shapes definition with specific geometric styles
// const shapes = [
//   {
//     id: 1,
//     label: "Data\nScientist",
//     color: "bg-orange-100/95", // Increased opacity for better visibility
//     borderColor: "border-orange-300",
//     textColor: "text-orange-900",
//     icon: Database,
//     type: "square",
//     angle: 0, 
//   },
//   {
//     id: 2,
//     label: "Innovation\nResearcher",
//     color: "bg-amber-100/95",
//     borderColor: "border-amber-300",
//     textColor: "text-amber-900",
//     icon: Search,
//     type: "hexagon",
//     angle: 90,
//   },
//   {
//     id: 3,
//     label: "Customer\nSuccess",
//     color: "bg-orange-200/95",
//     borderColor: "border-orange-400",
//     textColor: "text-orange-950",
//     icon: CheckCircle2,
//     type: "circle",
//     angle: 180,
//   },
//   {
//     id: 4,
//     label: "Lead\nSoftware",
//     color: "bg-red-100/95",
//     borderColor: "border-red-300",
//     textColor: "text-red-900",
//     icon: Code,
//     type: "gear",
//     angle: 270,
//   },
// ];

// export function ProcessFlow() {
//   return (
//     <section className="w-full py-16 lg:py-24 bg-gradient-to-b from-white to-orange-50/50 overflow-hidden relative">
//       <div className="container mx-auto px-4 text-center z-10 relative">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="mb-8"
//         >
//           <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4">
//             Process We Follow
//           </h2>
//           <p className="text-slate-500 max-w-xl mx-auto text-lg font-light">
//             Our mission is to revolutionize the online experience by developing
//             web-based services.
//           </p>
//         </motion.div>

//         {/* Main Visual Area */}
//         <div className="relative h-[550px] w-full max-w-5xl mx-auto flex items-center justify-center">
          
//           {/* FLOWING FUNNEL LINES & AVATARS */}
//           {/* We make this take up the full bottom area and extend upwards */}
//           <div className="absolute inset-x-0 bottom-0 top-0 pointer-events-none z-0">
//              <FlowingFunnel />
//           </div>

//           {/* CENTRAL HUB AND ORBITING SHAPES */}
//           <div className="relative z-20 w-[350px] h-[350px] md:w-[450px] md:h-[450px] flex items-center justify-center mt-12">
            
//             {/* Center Spinning Loader */}
//             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
//               <div className="w-20 h-20 bg-white/90 backdrop-blur shadow-[0_0_50px_-10px_theme(colors.orange.400)] rounded-full flex items-center justify-center border border-orange-100">
//                  <motion.div
//                     animate={{ rotate: 360 }}
//                     transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
//                     className="flex items-center justify-center p-2"
//                  >
//                     <Loader2 className="text-orange-500 w-8 h-8" />
//                  </motion.div>
//               </div>
//             </div>

//             {/* Orbiting Container */}
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
//               className="absolute inset-0 w-full h-full"
//             >
//               {shapes.map((shape) => (
//                 <div
//                   key={shape.id}
//                   className="absolute left-1/2 top-1/2"
//                   style={{
//                     // Position at radius. Responsive radius: mobile smaller, desktop larger.
//                     // We use Clamp or logic. Just use pixels for simplicity here.
//                     transform: `rotate(${shape.angle}deg) translate(150px)`, 
//                   }}
//                 >
//                     {/* 
//                       Ferris Wheel Effect:
//                       Outer container rotates (orbital).
//                       This inner container `rotate(-${shape.angle}deg)` cancels the INITIAL angle offset.
//                       The motion div `rotate: -360` cancels the CONTINUOUS orbital rotation.
//                     */}
//                     <div style={{ transform: `rotate(-${shape.angle}deg)` }}> 
//                         <motion.div
//                           animate={{ rotate: -360 }}
//                           transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
//                           className={`
//                             w-24 h-24 md:w-28 md:h-28 flex flex-col items-center justify-center p-2 text-center 
//                             shadow-lg backdrop-blur-sm border-[3px] 
//                             ${shape.color} ${shape.borderColor} ${shape.textColor}
//                             hover:scale-110 transition-transform cursor-pointer
//                           `}
//                           style={{ 
//                             borderRadius: shape.type === "square" ? "1.5rem" : shape.type === "circle" ? "50%" : "0",
//                             clipPath: shape.type === "hexagon" 
//                                 ? "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" 
//                                 : shape.type === "gear" 
//                                     ? "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
//                                     : undefined
//                           }}
//                         >
//                            <shape.icon className="mb-1 w-6 h-6 opacity-70" />
//                            <span className="text-[10px] md:text-xs font-bold leading-tight select-none">{shape.label}</span>
//                         </motion.div>
//                     </div>
//                 </div>
//               ))}
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function FlowingFunnel() {
//   const lineCount = 30; // "lot more lines"
  
//   // Memoize paths so they don't regenerate on re-renders, preventing jitter
//   const paths = useMemo(() => {
//     return Array.from({ length: lineCount }).map((_, i) => {
//       // Funnel shape logic
//       // Bottom width: Wide (0% to 100%)
//       // Top width: Narrow (around 50%)
      
//       const startX = (i / (lineCount - 1)) * 100; // Spread evenly across bottom
      
//       // Add randomness to startX to make it less grid-like
//       const randomStartOffset = (Math.random() - 0.5) * 5; // +/- 2.5%
//       const actualStartX = Math.max(0, Math.min(100, startX + randomStartOffset));
      
//       // End X is clustered funnel center
//       const spreadAtTop = 15; // 15% width at target
//       const endX = 50 + (Math.random() * spreadAtTop - spreadAtTop/2);
      
//       // Control points for Beizer Waterfall
//       // Waterfall: starts vertical, then moves to target
//       // M startX 100
//       // C control1X control1Y, control2X control2Y, endX endY
      
//       const endY = 40; // Aiming for center of hub (approx)
      
//       // Control point 1: Upward from start
//       const cp1X = actualStartX;
//       const cp1Y = 80;
      
//       // Control point 2: Converging towards end
//       const cp2X = endX; // + (Math.random() - 0.5) * 10;
//       const cp2Y = 60;
      
//       const d = `M ${actualStartX} 100 C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
      
//       const id = `funnel-path-${i}`;
      
//       const colors = ["#fed7aa", "#fdba74", "#fb923c", "#f97316"]; 
//       const color = colors[Math.floor(Math.random() * colors.length)];
      
//       // Avatar sitting logic
//       const hasAvatar = Math.random() > 0.8; // Sparse avatars
//       // To strictly "sit" on the line, we need coordinates.
//       // Cubic Bezier calculation B(t) = (1-t)^3 P0 + 3(1-t)^2 t P1 + 3(1-t) t^2 P2 + t^3 P3
//       // Let's pick a random t for the avatar position
//       const t = 0.2 + Math.random() * 0.4; // between 0.2 and 0.6 of the way up
      
//       const avatarX = 
//         Math.pow(1-t, 3) * actualStartX + 
//         3 * Math.pow(1-t, 2) * t * cp1X + 
//         3 * (1-t) * Math.pow(t, 2) * cp2X + 
//         Math.pow(t, 3) * endX;
        
//       const avatarY = 
//         Math.pow(1-t, 3) * 100 + 
//         3 * Math.pow(1-t, 2) * t * cp1Y + 
//         3 * (1-t) * Math.pow(t, 2) * cp2Y + 
//         Math.pow(t, 3) * endY;
      
//       return { id, d, color, hasAvatar, avatarX, avatarY };
//     });
//   }, []);

//   return (
//     <div className="w-full h-full">
//        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
//           <defs>
//              <linearGradient id="funnel-gradient" x1="0" y1="1" x2="0" y2="0">
//                 <stop offset="0%" stopColor="#FB923C" stopOpacity="0.1" />
//                 <stop offset="60%" stopColor="#EA580C" stopOpacity="0.6" />
//                 <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
//              </linearGradient>
//           </defs>
          
//           {paths.map((p) => (
//              <React.Fragment key={p.id}>
//                  {/* Static background trace */}
//                  <path 
//                     d={p.d} 
//                     stroke={p.color} 
//                     strokeWidth="0.2" 
//                     fill="none" 
//                     className="opacity-30"
//                  />
                 
//                  {/* Flowing highlight */}
//                  <path 
//                     d={p.d}
//                     stroke="url(#funnel-gradient)"
//                     strokeWidth="0.4"
//                     fill="none"
//                     strokeDasharray="4 6"
//                     className="animate-flow opacity-60"
//                     style={{ 
//                         animationDuration: `${3 + Math.random() * 4}s`,
//                         animationDelay: `-${Math.random() * 5}s`
//                     }}
//                  />
                 
//                  {/* Sitting Avatar */}
//                  {p.hasAvatar && (
//                      <g transform={`translate(${p.avatarX}, ${p.avatarY})`}>
//                          <circle r="2" fill="white" stroke="#EA580C" strokeWidth="0.3" />
//                          {/* Simple scalable icon placeholder - just a dot/circle for 'little avatars' */}
//                      </g>
//                  )}
//              </React.Fragment>
//           ))}
//        </svg>
       
//        <style jsx>{`
//           .animate-flow {
//              animation: flow-up linear infinite;
//           }
//           @keyframes flow-up {
//              from {
//                 stroke-dashoffset: 20;
//              }
//              to {
//                 stroke-dashoffset: 0;
//              }
//           }
//        `}</style>
//     </div>
//   );
// }






"use client";

import { motion } from "framer-motion";
import React, { useMemo } from "react";
import Image from "next/image";

const avatars = [
  { id: 1, src: "/avatars/avatar_1.png", angle: 0 },
  { id: 2, src: "/avatars/avatar_2.png", angle: 90 },
  { id: 3, src: "/avatars/avatar_3.png", angle: 180 },
  { id: 4, src: "/avatars/avatar_4.png", angle: 270 },
];

export default function ProcessFlow() {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif text-slate-900">
          Process We Follow
        </h2>
        <p className="mt-4 text-slate-500 max-w-xl mx-auto">
          Our mission is to revolutionize the online experience by developing
          web-based services.
        </p>

        <div className="relative mt-12 h-[600px] w-full flex items-center justify-center">
          {/* Funnel Lines */}
          <div className="absolute inset-0 z-0">
             <WaterfallLines />
          </div>

          {/* CENTREPIECE CONTAINER */}
          <div className="relative z-20 flex items-center justify-center -translate-y-[100px]">
             {/* Center Bulb */}
             <div className="relative z-20 w-32 h-32 md:w-36 md:h-36 flex items-center justify-center">
                <div className="absolute inset-0 bg-orange-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <Image 
                   src="/lightbulb.png" 
                   alt="Idea" 
                   width={120} 
                   height={120} 
                   className="object-contain relative z-20 drop-shadow-lg"
                />
             </div>

             {/* ORBITING AVATARS */}
             <motion.div
               className="absolute inset-0 w-0 h-0 flex items-center justify-center"
               animate={{ rotate: 360 }}
               transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
             >
               {avatars.map((avatar) => (
                 <div
                   key={avatar.id}
                   className="absolute"
                   style={{
                     transform: `rotate(${avatar.angle}deg) translate(180px)`,
                   }}
                 >
                   {/* Counter-rotate to keep avatar upright */}
                   <div style={{ transform: `rotate(-${avatar.angle}deg)` }}>
                     <motion.div
                       animate={{ rotate: -360 }}
                       transition={{
                         duration: 60,
                         repeat: Infinity,
                         ease: "linear",
                       }}
                       className="w-24 h-24 md:w-28 md:h-28 relative"
                     >
                       <div className="relative w-full h-full rounded-full bg-white shadow-xl overflow-hidden border-4 border-white">
                          <Image 
                             src={avatar.src} 
                             alt="Student" 
                             fill
                             className="object-cover"
                          />
                       </div>
                     </motion.div>
                   </div>
                 </div>
               ))}
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- WATERFALL FUNNEL ---------------- */

function WaterfallLines() {
  const lines = useMemo(() => {
    // Generate lines that start wide at bottom and converge to center (funnel)
    const count = 40;
    return Array.from({ length: count }).map((_, i) => {
      // Progress from left to right (0 to 1)
      const t = i / (count - 1);
      
      // Bottom X: Spread across 100% width
      // Add a little randomness to make it organic
      const startX = (t * 100) + (Math.random() * 2 - 1);
      
      // Top X: Converge to center (50%)
      // Keep them strictly sorted to avoid crossing
      // Spread top over a small area (e.g. 20% width)
      const spreadTop = 15;
      const endX = 50 - (spreadTop/2) + (t * spreadTop);

      // Alternating colors
      const isDark = i % 2 === 0;

      // Bezier path
      // Start at bottom (100%), end at top near bulb (approx 30%)
      // Control points to create funnel shape
      const startY = 100;
      const endY = 25; // Target height near bulb

      const cp1X = startX; // Go straight up initially
      const cp1Y = 70;
      
      const cp2X = endX; // Curve towards center
      const cp2Y = 60;

      const d = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;

      return { d, isDark };
    });
  }, []);

  return (
    <div className="w-full h-full absolute inset-0 overflow-hidden">
       {/* Gradient Mask to fade out lines at the top */}
       <div className="absolute inset-0 z-10 bg-gradient-to-b from-white via-transparent to-transparent h-[40%] pointer-events-none" />

       <svg
         className="w-full h-full"
         viewBox="0 0 100 100"
         preserveAspectRatio="none"
       >
         {lines.map((l, i) => (
           <path
             key={i}
             d={l.d}
             fill="none"
             stroke={l.isDark ? "#FB923C" : "#FED7AA"} // Orange-400 vs Orange-200
             strokeWidth={l.isDark ? 0.3 : 0.2}
             opacity={0.6}
             className="animate-pulse"
             style={{ animationDelay: `${i * 0.1}s`, animationDuration: '3s' }}
           />
         ))}
       </svg>
    </div>
  );
}
