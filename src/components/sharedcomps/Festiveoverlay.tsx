






// // // // "use client";

// // // // import React, { useEffect, useState } from 'react';

// // // // // --- Enhanced "Fun" SVG Components ---

// // // // const BellIcon = () => (
// // // //   <svg width="45" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
// // // //     <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill="#FFD700" stroke="#B8860B" strokeWidth="1"/>
// // // //     <circle cx="12" cy="19" r="2" fill="#B8860B" /> {/* The Clapper */}
// // // //     <path d="M9 8c0-1.657 1.343-3 3-3s3 1.343 3 3" stroke="#B8860B" strokeWidth="1" strokeLinecap="round"/>
// // // //     <path d="M7 14h10" stroke="white" strokeWidth="0.5" strokeOpacity="0.5" /> {/* Highlight detail */}
// // // //   </svg>
// // // // );

// // // // const OrnamentIcon = ({ color, patternColor = "white" }: { color: string, patternColor?: string }) => (
// // // //   <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
// // // //     <circle cx="12" cy="13" r="8" fill={color} stroke="rgba(0,0,0,0.1)" strokeWidth="0.5"/>
// // // //     {/* Decorative Stripes */}
// // // //     <path d="M5 11.5c2 1 4-1 7 0s5 1 7 0" stroke={patternColor} strokeWidth="1" strokeOpacity="0.4"/>
// // // //     <path d="M4.5 14.5c2 1 4-1 7 0s5 1 7 0" stroke={patternColor} strokeWidth="1" strokeOpacity="0.4"/>
// // // //     {/* Ornament Cap */}
// // // //     <rect x="10.5" y="3" width="3" height="3" rx="1" fill="#D1D5DB"/>
// // // //     <circle cx="12" cy="3" r="1.5" stroke="#9CA3AF" strokeWidth="0.8" fill="none"/>
// // // //   </svg>
// // // // );

// // // // const StarIcon = () => (
// // // //   <svg width="45" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
// // // //     <path d="M12 2l2.5 7.5H22l-6 4.5 2.5 8-6.5-5-6.5 5 2.5-8-6-4.5h7.5L12 2z" fill="#FFFACD" stroke="#DAA520" strokeWidth="1"/>
// // // //     <circle cx="12" cy="12" r="2" fill="white" fillOpacity="0.5" filter="blur(1px)"/> {/* Center Glow */}
// // // //   </svg>
// // // // );

// // // // export default function FestiveOverlay() {
// // // //   const [mounted, setMounted] = useState(false);

// // // //   useEffect(() => {
// // // //     setMounted(true);
// // // //   }, []);

// // // //   if (!mounted) return null;

// // // //   return (
// // // //     <>
// // // //       <style>{`
// // // //         .snow-wrapper {
// // // //           position: fixed;
// // // //           inset: 0;
// // // //           pointer-events: none;
// // // //           z-index: 9998;
// // // //           mask-image: linear-gradient(to bottom, black 0%, black 50%, transparent 95%);
// // // //           -webkit-mask-image: linear-gradient(to bottom, black 0%, black 50%, transparent 95%);
// // // //         }

// // // //         .snowflake {
// // // //           position: fixed;
// // // //           top: -10%;
// // // //           background-color: white;
// // // //           border-radius: 50%;
// // // //           opacity: 0.6;
// // // //           animation: fall linear infinite;
// // // //         }

// // // //         @keyframes fall {
// // // //           0% { transform: translateY(0vh) translateX(0px); }
// // // //           50% { transform: translateY(50vh) translateX(40px); }
// // // //           100% { transform: translateY(115vh) translateX(0px); }
// // // //         }

// // // //         .garland-item {
// // // //           opacity: 0.5;
// // // //           transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
// // // //           transform-origin: top center;
// // // //           animation: swing ease-in-out infinite alternate;
// // // //         }
        
// // // //         .garland-item:hover {
// // // //           opacity: 1;
// // // //           transform: scale(1.2) rotate(15deg) !important; /* Fun jiggle/tilt on hover */
// // // //           filter: drop-shadow(0 0 8px rgba(255,255,255,0.4));
// // // //         }

// // // //         @keyframes swing {
// // // //           from { transform: rotate(-5deg); }
// // // //           to { transform: rotate(5deg); }
// // // //         }
// // // //       `}</style>

// // // //       {/* Parallax Snow Layer (High Density: 100 flakes) */}
// // // //       <div className="snow-wrapper">
// // // //         {[...Array(100)].map((_, i) => {
// // // //           const size = Math.random() * 9 + 4; 
// // // //           const speed = 18 - size; 
// // // //           const blur = size / 5; 

// // // //           return (
// // // //             <div
// // // //               key={i}
// // // //               className="snowflake"
// // // //               style={{
// // // //                 width: `${size}px`,
// // // //                 height: `${size}px`,
// // // //                 left: `${Math.random() * 100}%`,
// // // //                 filter: `blur(${blur}px)`,
// // // //                 animationDuration: `${speed + Math.random() * 5}s`,
// // // //                 animationDelay: `${Math.random() * -20}s`,
// // // //               }}
// // // //             />
// // // //           );
// // // //         })}
// // // //       </div>

// // // //       {/* Hanging Decorations (Dense & Varied) */}
// // // //       <div className="fixed top-0 left-0 w-full flex justify-around items-start pointer-events-none z-[9999] px-2">
// // // //         <HangingItem length={70} delay="0s"><BellIcon /></HangingItem>
// // // //         <HangingItem length={45} delay="0.5s"><OrnamentIcon color="#ef4444" /></HangingItem> {/* Candy Red */}
// // // //         <HangingItem length={90} delay="1.2s"><StarIcon /></HangingItem>
// // // //         <HangingItem length={60} delay="0.8s"><OrnamentIcon color="#22c55e" /></HangingItem> {/* Forest Green */}
// // // //         <HangingItem length={110} delay="2.1s"><BellIcon /></HangingItem>
// // // //         <HangingItem length={50} delay="1.5s"><OrnamentIcon color="#3b82f6" /></HangingItem> {/* Ice Blue */}
// // // //         <HangingItem length={85} delay="0.3s"><StarIcon /></HangingItem>
// // // //         <HangingItem length={55} delay="1.8s"><OrnamentIcon color="#ec4899" /></HangingItem> {/* Pink */}
// // // //         <HangingItem length={100} delay="0.7s"><BellIcon /></HangingItem>
// // // //         <HangingItem length={40} delay="1.1s"><OrnamentIcon color="#f59e0b" /></HangingItem> {/* Gold/Orange */}
// // // //         <HangingItem length={80} delay="2.4s"><StarIcon /></HangingItem>
// // // //         <HangingItem length={65} delay="0.2s"><OrnamentIcon color="#a855f7" /></HangingItem> {/* Purple */}
// // // //       </div>
// // // //     </>
// // // //   );
// // // // }

// // // // function HangingItem({ children, length, delay }: { children: React.ReactNode, length: number, delay: string }) {
// // // //   return (
// // // //     <div 
// // // //       className="garland-item flex flex-col items-center pointer-events-auto" 
// // // //       style={{ 
// // // //         animationDuration: `${3.5 + Math.random() * 1.5}s`,
// // // //         animationDelay: delay 
// // // //       }}
// // // //     >
// // // //       <div className="bg-white/20 w-[1px]" style={{ height: `${length}px` }} />
// // // //       <div className="transform -mt-1 cursor-pointer">
// // // //         {children}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }






// // // "use client";

// // // import React, { useEffect, useState } from 'react';

// // // // --- Extra Large & Detailed SVG Components ---

// // // const BellIcon = () => (
// // //   <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
// // //     <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill="#FFD700" stroke="#B8860B" strokeWidth="0.8"/>
// // //     <circle cx="12" cy="19" r="2.5" fill="#B8860B" />
// // //     <path d="M9 8c0-1.657 1.343-3 3-3s3 1.343 3 3" stroke="#B8860B" strokeWidth="1" strokeLinecap="round"/>
// // //     <path d="M7 14c2-1 8-1 10 0" stroke="white" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" /> 
// // //   </svg>
// // // );

// // // const OrnamentIcon = ({ color, patternColor = "white" }: { color: string, patternColor?: string }) => (
// // //   <svg width="55" height="55" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
// // //     <circle cx="12" cy="13" r="9" fill={color} stroke="rgba(0,0,0,0.1)" strokeWidth="0.5"/>
// // //     <path d="M4 11s2 2 4 0 4-2 8 0 4 2 4 2" stroke={patternColor} strokeWidth="1.2" strokeOpacity="0.5"/>
// // //     <path d="M3.5 14s2 2 4 0 4-2 8 0 4 2 4 2" stroke={patternColor} strokeWidth="1.2" strokeOpacity="0.5"/>
// // //     <rect x="10" y="2" width="4" height="3" rx="1" fill="#9CA3AF"/>
// // //     <circle cx="12" cy="2" r="2" stroke="#6B7280" strokeWidth="1" fill="none"/>
// // //   </svg>
// // // );

// // // const StarIcon = () => (
// // //   <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
// // //     <path d="M12 2l3 7h7.5l-6 5 2.5 8-7-5-7 5 2.5-8-6-5h7.5L12 2z" fill="#FFFACD" stroke="#DAA520" strokeWidth="1"/>
// // //     <path d="M12 6l1.5 3.5h3.5l-3 2.5 1 3.5-3-2.5-3 2.5 1-3.5-3-2.5h3.5L12 6z" fill="white" fillOpacity="0.3" />
// // //   </svg>
// // // );

// // // export default function FestiveOverlay() {
// // //   const [mounted, setMounted] = useState(false);

// // //   useEffect(() => {
// // //     setMounted(true);
// // //   }, []);

// // //   if (!mounted) return null;

// // //   return (
// // //     <>
// // //       <style>{`
// // //         .snow-wrapper {
// // //           position: fixed;
// // //           inset: 0;
// // //           pointer-events: none;
// // //           z-index: 9998;
// // //           mask-image: linear-gradient(to bottom, black 0%, black 55%, transparent 98%);
// // //           -webkit-mask-image: linear-gradient(to bottom, black 0%, black 55%, transparent 98%);
// // //         }

// // //         .snowflake {
// // //           position: fixed;
// // //           top: -10%;
// // //           background-color: white;
// // //           border-radius: 50%;
// // //           opacity: 0.7;
// // //           animation: fall linear infinite;
// // //         }

// // //         @keyframes fall {
// // //           0% { transform: translateY(0vh) translateX(0px); }
// // //           50% { transform: translateY(50vh) translateX(45px); }
// // //           100% { transform: translateY(115vh) translateX(0px); }
// // //         }

// // //         .garland-item {
// // //           opacity: 0.75; /* Higher opacity for better visibility */
// // //           transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
// // //           transform-origin: top center;
// // //           animation: swing ease-in-out infinite alternate;
// // //         }
        
// // //         .garland-item:hover {
// // //           opacity: 1;
// // //           transform: scale(1.15) rotate(12deg) !important;
// // //           filter: drop-shadow(0 0 12px rgba(255,255,255,0.5));
// // //         }

// // //         @keyframes swing {
// // //           from { transform: rotate(-4deg); }
// // //           to { transform: rotate(4deg); }
// // //         }
// // //       `}</style>

// // //       {/* Dense Parallax Snow */}
// // //       <div className="snow-wrapper">
// // //         {[...Array(110)].map((_, i) => {
// // //           const size = Math.random() * 10 + 5; // Even bigger flakes
// // //           const speed = 20 - size; 
// // //           const blur = size / 5.5; 

// // //           return (
// // //             <div
// // //               key={i}
// // //               className="snowflake"
// // //               style={{
// // //                 width: `${size}px`,
// // //                 height: `${size}px`,
// // //                 left: `${Math.random() * 100}%`,
// // //                 filter: `blur(${blur}px)`,
// // //                 animationDuration: `${speed + Math.random() * 6}s`,
// // //                 animationDelay: `${Math.random() * -20}s`,
// // //               }}
// // //             />
// // //           );
// // //         })}
// // //       </div>

// // //       {/* Heavy Garland Layer */}
// // //       <div className="fixed top-0 left-0 w-full flex justify-around items-start pointer-events-none z-[9999] px-1">
// // //         <HangingItem length={85} delay="0s"><BellIcon /></HangingItem>
// // //         <HangingItem length={50} delay="0.5s"><OrnamentIcon color="#dc2626" /></HangingItem>
// // //         <HangingItem length={110} delay="1.2s"><StarIcon /></HangingItem>
// // //         <HangingItem length={70} delay="0.8s"><OrnamentIcon color="#16a34a" /></HangingItem>
// // //         <HangingItem length={130} delay="2.1s"><BellIcon /></HangingItem>
// // //         <HangingItem length={60} delay="1.5s"><OrnamentIcon color="#2563eb" /></HangingItem>
// // //         <HangingItem length={95} delay="0.3s"><StarIcon /></HangingItem>
// // //         <HangingItem length={65} delay="1.8s"><OrnamentIcon color="#db2777" /></HangingItem>
// // //         <HangingItem length={115} delay="0.7s"><BellIcon /></HangingItem>
// // //         <HangingItem length={45} delay="1.1s"><OrnamentIcon color="#ea580c" /></HangingItem>
// // //         <HangingItem length={90} delay="2.4s"><StarIcon /></HangingItem>
// // //         <HangingItem length={75} delay="0.2s"><OrnamentIcon color="#7c3aed" /></HangingItem>
// // //       </div>
// // //     </>
// // //   );
// // // }

// // // function HangingItem({ children, length, delay }: { children: React.ReactNode, length: number, delay: string }) {
// // //   return (
// // //     <div 
// // //       className="garland-item flex flex-col items-center pointer-events-auto" 
// // //       style={{ 
// // //         animationDuration: `${4 + Math.random() * 2}s`,
// // //         animationDelay: delay 
// // //       }}
// // //     >
// // //       <div className="bg-white/30 w-[2px] rounded-full" style={{ height: `${length}px` }} />
// // //       <div className="transform -mt-1 cursor-pointer">
// // //         {children}
// // //       </div>
// // //     </div>
// // //   );
// // // }








// // "use client";

// // import React, { useEffect, useState } from 'react';

// // // --- Large SVG Components ---

// // const BellIcon = () => (
// //   <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
// //     <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill="#FFD700" stroke="#B8860B" strokeWidth="0.8"/>
// //     <circle cx="12" cy="19" r="2.5" fill="#B8860B" />
// //     <path d="M9 8c0-1.657 1.343-3 3-3s3 1.343 3 3" stroke="#B8860B" strokeWidth="1" strokeLinecap="round"/>
// //     <path d="M7 14c2-1 8-1 10 0" stroke="white" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" /> 
// //   </svg>
// // );

// // const OrnamentIcon = ({ color, patternColor = "white" }: { color: string, patternColor?: string }) => (
// //   <svg width="55" height="55" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
// //     <circle cx="12" cy="13" r="9" fill={color} stroke="rgba(0,0,0,0.1)" strokeWidth="0.5"/>
// //     <path d="M4 11s2 2 4 0 4-2 8 0 4 2 4 2" stroke={patternColor} strokeWidth="1.2" strokeOpacity="0.5"/>
// //     <rect x="10" y="2" width="4" height="3" rx="1" fill="#9CA3AF"/>
// //     <circle cx="12" cy="2" r="2" stroke="#6B7280" strokeWidth="1" fill="none"/>
// //   </svg>
// // );

// // const StarIcon = () => (
// //   <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
// //     <path d="M12 2l3 7h7.5l-6 5 2.5 8-7-5-7 5 2.5-8-6-5h7.5L12 2z" fill="#FFFACD" stroke="#DAA520" strokeWidth="1"/>
// //     <path d="M12 6l1.5 3.5h3.5l-3 2.5 1 3.5-3-2.5-3 2.5 1-3.5-3-2.5h3.5L12 6z" fill="white" fillOpacity="0.3" />
// //   </svg>
// // );

// // export default function FestiveOverlay() {
// //   const [mounted, setMounted] = useState(false);

// //   useEffect(() => {
// //     setMounted(true);
// //   }, []);

// //   if (!mounted) return null;

// //   return (
// //     <>
// //       <style>{`
// //         .festive-container {
// //           position: fixed;
// //           inset: 0;
// //           /* This is the magic: prevents the container from catching clicks */
// //           pointer-events: none; 
// //           z-index: 9999;
// //           overflow: hidden;
// //         }

// //         .snow-wrapper {
// //           position: absolute;
// //           inset: 0;
// //           mask-image: linear-gradient(to bottom, black 0%, black 55%, transparent 98%);
// //           -webkit-mask-image: linear-gradient(to bottom, black 0%, black 55%, transparent 98%);
// //         }

// //         .snowflake {
// //           position: absolute;
// //           top: -10%;
// //           background-color: white;
// //           border-radius: 50%;
// //           opacity: 0.7;
// //           animation: fall linear infinite;
// //         }

// //         @keyframes fall {
// //           0% { transform: translateY(0vh) translateX(0px); }
// //           50% { transform: translateY(50vh) translateX(45px); }
// //           100% { transform: translateY(115vh) translateX(0px); }
// //         }

// //         .garland-item {
// //           opacity: 0.75;
// //           transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
// //           transform-origin: top center;
// //           animation: swing ease-in-out infinite alternate;
// //           /* Allows the ornaments themselves to be hoverable */
// //           pointer-events: auto; 
// //         }
        
// //         .garland-item:hover {
// //           opacity: 1;
// //           transform: scale(1.1) rotate(10deg);
// //         }

// //         @keyframes swing {
// //           from { transform: rotate(-3deg); }
// //           to { transform: rotate(3deg); }
// //         }
// //       `}</style>

// //       <div className="festive-container">
// //         {/* Snow Layer */}
// //         <div className="snow-wrapper">
// //           {[...Array(110)].map((_, i) => {
// //             const size = Math.random() * 8 + 6; 
// //             const speed = 22 - size; 
// //             const blur = size / 6; 
// //             return (
// //               <div
// //                 key={i}
// //                 className="snowflake"
// //                 style={{
// //                   width: `${size}px`,
// //                   height: `${size}px`,
// //                   left: `${Math.random() * 100}%`,
// //                   filter: `blur(${blur}px)`,
// //                   animationDuration: `${speed + Math.random() * 5}s`,
// //                   animationDelay: `${Math.random() * -20}s`,
// //                 }}
// //               />
// //             );
// //           })}
// //         </div>

// //         {/* Garland Layer */}
// //         <div className="absolute top-0 left-0 w-full flex justify-around items-start px-2 h-0">
// //           <HangingItem length={80} delay="0s"><BellIcon /></HangingItem>
// //           <HangingItem length={45} delay="0.5s"><OrnamentIcon color="#dc2626" /></HangingItem>
// //           <HangingItem length={100} delay="1.2s"><StarIcon /></HangingItem>
// //           <HangingItem length={65} delay="0.8s"><OrnamentIcon color="#16a34a" /></HangingItem>
// //           <HangingItem length={120} delay="2.1s"><BellIcon /></HangingItem>
// //           <HangingItem length={55} delay="1.5s"><OrnamentIcon color="#2563eb" /></HangingItem>
// //           <HangingItem length={90} delay="0.3s"><StarIcon /></HangingItem>
// //           <HangingItem length={60} delay="1.8s"><OrnamentIcon color="#db2777" /></HangingItem>
// //           <HangingItem length={110} delay="0.7s"><BellIcon /></HangingItem>
// //           <HangingItem length={40} delay="1.1s"><OrnamentIcon color="#ea580c" /></HangingItem>
// //           <HangingItem length={85} delay="2.4s"><StarIcon /></HangingItem>
// //           <HangingItem length={70} delay="0.2s"><OrnamentIcon color="#7c3aed" /></HangingItem>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // function HangingItem({ children, length, delay }: { children: React.ReactNode, length: number, delay: string }) {
// //   return (
// //     <div 
// //       className="garland-item flex flex-col items-center" 
// //       style={{ 
// //         animationDuration: `${4 + Math.random() * 2}s`,
// //         animationDelay: delay 
// //       }}
// //     >
// //       <div className="bg-white/30 w-[2px] rounded-full" style={{ height: `${length}px` }} />
// //       <div className="transform -mt-1">
// //         {children}
// //       </div>
// //     </div>
// //   );
// // }







// "use client";

// import React, { useEffect, useState } from 'react';

// // --- Large SVG Components ---

// const BellIcon = () => (
//   <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl pointer-events-auto cursor-pointer">
//     <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill="#FFD700" stroke="#B8860B" strokeWidth="0.8"/>
//     <circle cx="12" cy="19" r="2.5" fill="#B8860B" />
//     <path d="M9 8c0-1.657 1.343-3 3-3s3 1.343 3 3" stroke="#B8860B" strokeWidth="1" strokeLinecap="round"/>
//     <path d="M7 14c2-1 8-1 10 0" stroke="white" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" /> 
//   </svg>
// );

// const OrnamentIcon = ({ color, patternColor = "white" }: { color: string, patternColor?: string }) => (
//   <svg width="55" height="55" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl pointer-events-auto cursor-pointer">
//     <circle cx="12" cy="13" r="9" fill={color} stroke="rgba(0,0,0,0.1)" strokeWidth="0.5"/>
//     <path d="M4 11s2 2 4 0 4-2 8 0 4 2 4 2" stroke={patternColor} strokeWidth="1.2" strokeOpacity="0.5"/>
//     <rect x="10" y="2" width="4" height="3" rx="1" fill="#9CA3AF"/>
//     <circle cx="12" cy="2" r="2" stroke="#6B7280" strokeWidth="1" fill="none"/>
//   </svg>
// );

// const StarIcon = () => (
//   <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl pointer-events-auto cursor-pointer">
//     <path d="M12 2l3 7h7.5l-6 5 2.5 8-7-5-7 5 2.5-8-6-5h7.5L12 2z" fill="#FFFACD" stroke="#DAA520" strokeWidth="1"/>
//     <path d="M12 6l1.5 3.5h3.5l-3 2.5 1 3.5-3-2.5-3 2.5 1-3.5-3-2.5h3.5L12 6z" fill="white" fillOpacity="0.3" />
//   </svg>
// );

// export default function FestiveOverlay() {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   return (
//     <>
//       <style>{`
//         .festive-master-root {
//           position: fixed;
//           inset: 0;
//           pointer-events: none; /* Everything is unclickable by default */
//           z-index: 999999; /* Ensure it stays above content, but doesn't block it */
//           overflow: hidden;
//         }

//         .snowflake {
//           position: absolute;
//           top: -10%;
//           background-color: white;
//           border-radius: 50%;
//           opacity: 0.7;
//           pointer-events: none; /* Snow specifically must be unclickable */
//           animation: fall linear infinite;
//         }

//         @keyframes fall {
//           0% { transform: translateY(0vh) translateX(0px); }
//           50% { transform: translateY(50vh) translateX(45px); }
//           100% { transform: translateY(115vh) translateX(0px); }
//         }

//         .garland-wrapper {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           display: flex;
//           justify-content: space-around;
//           align-items: start;
//           padding: 0 10px;
//           pointer-events: none; /* Flex container doesn't block clicks */
//         }

//         .garland-item {
//           opacity: 0.75;
//           transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//           transform-origin: top center;
//           animation: swing ease-in-out infinite alternate;
//           pointer-events: none; /* The "string" and container don't block clicks */
//         }
        
//         /* Only trigger hover effects when the ACTUAL SVG is hovered */
//         .garland-item:has(svg:hover) {
//           opacity: 1;
//           transform: scale(1.1) rotate(10deg);
//         }

//         @keyframes swing {
//           from { transform: rotate(-3deg); }
//           to { transform: rotate(3deg); }
//         }
//       `}</style>

//       <div className="festive-master-root">
//         {/* Snow Layer */}
//         {[...Array(110)].map((_, i) => {
//           const size = Math.random() * 8 + 6; 
//           return (
//             <div
//               key={i}
//               className="snowflake"
//               style={{
//                 width: `${size}px`,
//                 height: `${size}px`,
//                 left: `${Math.random() * 100}%`,
//                 filter: `blur(${size / 6}px)`,
//                 animationDuration: `${22 - size + Math.random() * 5}s`,
//                 animationDelay: `${Math.random() * -20}s`,
//               }}
//             />
//           );
//         })}

//         {/* Garland Layer */}
//         <div className="garland-wrapper">
//           <HangingItem length={80} delay="0s"><BellIcon /></HangingItem>
//           <HangingItem length={45} delay="0.5s"><OrnamentIcon color="#dc2626" /></HangingItem>
//           <HangingItem length={100} delay="1.2s"><StarIcon /></HangingItem>
//           <HangingItem length={65} delay="0.8s"><OrnamentIcon color="#16a34a" /></HangingItem>
//           <HangingItem length={120} delay="2.1s"><BellIcon /></HangingItem>
//           <HangingItem length={55} delay="1.5s"><OrnamentIcon color="#2563eb" /></HangingItem>
//           <HangingItem length={90} delay="0.3s"><StarIcon /></HangingItem>
//           <HangingItem length={60} delay="1.8s"><OrnamentIcon color="#db2777" /></HangingItem>
//           <HangingItem length={110} delay="0.7s"><BellIcon /></HangingItem>
//           <HangingItem length={40} delay="1.1s"><OrnamentIcon color="#ea580c" /></HangingItem>
//           <HangingItem length={85} delay="2.4s"><StarIcon /></HangingItem>
//           <HangingItem length={70} delay="0.2s"><OrnamentIcon color="#7c3aed" /></HangingItem>
//         </div>
//       </div>
//     </>
//   );
// }

// function HangingItem({ children, length, delay }: { children: React.ReactNode, length: number, delay: string }) {
//   return (
//     <div 
//       className="garland-item flex flex-col items-center" 
//       style={{ 
//         animationDuration: `${4 + Math.random() * 2}s`,
//         animationDelay: delay 
//       }}
//     >
//       <div className="bg-white/20 w-[1.5px] rounded-full" style={{ height: `${length}px` }} />
//       <div className="transform -mt-1">
//         {children}
//       </div>
//     </div>
//   );
// }






"use client";

import React, { useEffect, useState } from 'react';

// --- Large SVG Components ---

const BellIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl pointer-events-auto cursor-pointer">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill="#FFD700" stroke="#B8860B" strokeWidth="0.8"/>
    <circle cx="12" cy="19" r="2.5" fill="#B8860B" />
    <path d="M9 8c0-1.657 1.343-3 3-3s3 1.343 3 3" stroke="#B8860B" strokeWidth="1" strokeLinecap="round"/>
    <path d="M7 14c2-1 8-1 10 0" stroke="white" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" /> 
  </svg>
);

const OrnamentIcon = ({ color, patternColor = "white" }: { color: string, patternColor?: string }) => (
  <svg width="55" height="55" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl pointer-events-auto cursor-pointer">
    <circle cx="12" cy="13" r="9" fill={color} stroke="rgba(0,0,0,0.1)" strokeWidth="0.5"/>
    <path d="M4 11s2 2 4 0 4-2 8 0 4 2 4 2" stroke={patternColor} strokeWidth="1.2" strokeOpacity="0.5"/>
    <rect x="10" y="2" width="4" height="3" rx="1" fill="#9CA3AF"/>
    <circle cx="12" cy="2" r="2" stroke="#6B7280" strokeWidth="1" fill="none"/>
  </svg>
);

const StarIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl pointer-events-auto cursor-pointer">
    <path d="M12 2l3 7h7.5l-6 5 2.5 8-7-5-7 5 2.5-8-6-5h7.5L12 2z" fill="#FFFACD" stroke="#DAA520" strokeWidth="1"/>
    <path d="M12 6l1.5 3.5h3.5l-3 2.5 1 3.5-3-2.5-3 2.5 1-3.5-3-2.5h3.5L12 6z" fill="white" fillOpacity="0.3" />
  </svg>
);

export default function FestiveOverlay() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <style>{`
        .festive-master-root {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 999999;
          overflow: hidden;
        }

        .snowflake {
          position: absolute;
          top: -10%;
          background-color: white;
          border-radius: 50%;
          opacity: 0.7;
          animation: fall linear infinite;
        }

        @keyframes fall {
          0% { transform: translateY(0vh) translateX(0px); }
          50% { transform: translateY(50vh) translateX(45px); }
          100% { transform: translateY(115vh) translateX(0px); }
        }

        .garland-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: space-around;
          align-items: start;
          padding: 0 5%;
        }

        .garland-item {
          opacity: 0.75;
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-origin: top center;
          animation: swing ease-in-out infinite alternate;
        }
        
        .garland-item:has(svg:hover) {
          opacity: 1;
          transform: scale(1.1) rotate(0deg);
        }

        @keyframes swing {
          from { transform: rotate(-5deg); }
          to { transform: rotate(5deg); }
        }
      `}</style>

      <div className="festive-master-root">
        {/* Parallax Snow Layer */}
        {[...Array(110)].map((_, i) => {
          const size = Math.random() * 8 + 6; 
          return (
            <div
              key={i}
              className="snowflake"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                filter: `blur(${size / 6}px)`,
                animationDuration: `${22 - size + Math.random() * 5}s`,
                animationDelay: `${Math.random() * -20}s`,
              }}
            />
          );
        })}

        {/* Organic Garland Layer */}
        <div className="garland-wrapper">
          {/* Custom lengths and offsets for "Realness" */}
          <HangingItem length={120} offset={-20} delay="0.1s"><BellIcon /></HangingItem>
          <HangingItem length={60} offset={10} delay="0.5s"><OrnamentIcon color="#dc2626" /></HangingItem>
          <HangingItem length={140} offset={-15} delay="1.2s"><StarIcon /></HangingItem>
          <HangingItem length={80} offset={5} delay="0.8s"><OrnamentIcon color="#16a34a" /></HangingItem>
          <HangingItem length={160} offset={-30} delay="2.1s"><BellIcon /></HangingItem>
          <HangingItem length={70} offset={15} delay="1.5s"><OrnamentIcon color="#2563eb" /></HangingItem>
          <HangingItem length={130} offset={-10} delay="0.3s"><StarIcon /></HangingItem>
          <HangingItem length={90} offset={20} delay="1.8s"><OrnamentIcon color="#db2777" /></HangingItem>
          <HangingItem length={150} offset={-25} delay="0.7s"><BellIcon /></HangingItem>
          <HangingItem length={50} offset={30} delay="1.1s"><OrnamentIcon color="#ea580c" /></HangingItem>
          <HangingItem length={110} offset={0} delay="2.4s"><StarIcon /></HangingItem>
          <HangingItem length={95} offset={10} delay="0.2s"><OrnamentIcon color="#7c3aed" /></HangingItem>
        </div>
      </div>
    </>
  );
}

function HangingItem({ 
  children, 
  length, 
  offset, 
  delay 
}: { 
  children: React.ReactNode, 
  length: number, 
  offset: number, 
  delay: string 
}) {
  return (
    <div 
      className="garland-item flex flex-col items-center" 
      style={{ 
        marginTop: `${offset}px`, // Shifts the entire object up or down
        animationDuration: `${3.5 + Math.random() * 2}s`,
        animationDelay: delay 
      }}
    >
      <div className="bg-white/20 w-[1.5px] rounded-full" style={{ height: `${length}px` }} />
      <div className="transform -mt-1">
        {children}
      </div>
    </div>
  );
}