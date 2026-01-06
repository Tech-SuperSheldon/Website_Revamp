// import React from 'react';

// // 1. Define available color themes
// export type ChristmasButtonColor = 'orange' | 'emerald' | 'blue' | 'red' | 'purple' | 'slate';

// interface ChristmasButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   onClick?: () => void;
//   color?: ChristmasButtonColor; // New prop
// }

// // 2. Map colors to specific Tailwind classes for each layer of the design
// const themeConfig: Record<ChristmasButtonColor, {
//   sky: string;       // The gradient background
//   hillBack: string;  // The lighter rear hill
//   hillFront: string; // The darker front hill
//   tree: string;      // The tree silhouette
//   ring: string;      // Focus ring color
// }> = {
//   orange: {
//     sky: 'from-orange-300 to-orange-400',
//     hillBack: 'text-orange-500',
//     hillFront: 'text-orange-600',
//     tree: 'text-orange-900',
//     ring: 'focus:ring-orange-300',
//   },
//   emerald: {
//     sky: 'from-emerald-300 to-emerald-400',
//     hillBack: 'text-emerald-500',
//     hillFront: 'text-emerald-600',
//     tree: 'text-emerald-900',
//     ring: 'focus:ring-emerald-300',
//   },
//   blue: {
//     sky: 'from-sky-300 to-sky-400',
//     hillBack: 'text-sky-500',
//     hillFront: 'text-sky-600',
//     tree: 'text-sky-900',
//     ring: 'focus:ring-sky-300',
//   },
//   red: {
//     sky: 'from-rose-300 to-rose-400',
//     hillBack: 'text-rose-500',
//     hillFront: 'text-rose-600',
//     tree: 'text-rose-900',
//     ring: 'focus:ring-rose-300',
//   },
//   purple: {
//     sky: 'from-purple-300 to-purple-400',
//     hillBack: 'text-purple-500',
//     hillFront: 'text-purple-600',
//     tree: 'text-purple-900',
//     ring: 'focus:ring-purple-300',
//   },
//   slate: {
//     sky: 'from-slate-300 to-slate-400',
//     hillBack: 'text-slate-500',
//     hillFront: 'text-slate-600',
//     tree: 'text-slate-900',
//     ring: 'focus:ring-slate-300',
//   },
// };

// const ChristmasButton: React.FC<ChristmasButtonProps> = ({ 
//   onClick, 
//   color = 'orange', // Default to orange
//   className = '',
//   ...props 
// }) => {
  
//   const theme = themeConfig[color];

//   return (
//     <button
//       onClick={onClick}
//       className={`group relative h-16 w-48 overflow-hidden rounded-2xl shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 ${theme.ring} ${className}`}
//       {...props}
//     >
//       {/* --- Background Sky --- */}
//       <div className={`absolute inset-0 bg-gradient-to-b ${theme.sky}`} />

//       {/* --- Decorative Elements Layer --- */}
//       <div className="absolute inset-0 pointer-events-none">
        
//         {/* Background Hill */}
//         <svg
//           className={`absolute bottom-0 left-0 w-full ${theme.hillBack}`}
//           viewBox="0 0 200 60"
//           preserveAspectRatio="none"
//         >
//           <path
//             fill="currentColor"
//             d="M0,60 L0,35 C30,35 50,15 80,25 C110,35 140,45 200,30 L200,60 Z"
//           />
//         </svg>

//         {/* Foreground Hill */}
//         <svg
//           className={`absolute bottom-0 left-0 w-full ${theme.hillFront}`}
//           viewBox="0 0 200 50"
//           preserveAspectRatio="none"
//         >
//           <path
//             fill="currentColor"
//             d="M0,60 L0,40 C20,40 40,20 70,30 C100,40 130,10 160,20 C180,25 190,40 200,45 L200,60 Z"
//           />
//         </svg>

//         {/* Pine Tree */}
//         <svg
//           className={`absolute bottom-[-5px] right-2 h-20 w-16 ${theme.tree}`}
//           viewBox="0 0 100 150"
//           fill="currentColor"
//         >
//           <path d="M50 0 L80 40 H65 L90 80 H70 L100 130 H0 L30 80 H10 L35 40 H20 Z" />
//         </svg>
        
//         {/* Distant Smaller Trees (Opacity hardcoded for subtle effect, inheriting color) */}
//          <svg
//           className={`absolute bottom-0 left-4 h-10 w-8 ${theme.hillFront} opacity-80`}
//           viewBox="0 0 100 150"
//           fill="currentColor"
//         >
//           <path d="M50 10 L80 50 H20 Z M50 40 L90 90 H10 Z" />
//         </svg>
//         <svg
//           className={`absolute bottom-0 left-16 h-8 w-6 ${theme.hillFront} opacity-80`}
//           viewBox="0 0 100 150"
//           fill="currentColor"
//         >
//            <path d="M50 10 L80 50 H20 Z M50 40 L90 90 H10 Z" />
//         </svg>

//         {/* Stars/Snow (Always white) */}
//         <div className="absolute top-2 left-3 text-white opacity-80 animate-pulse">
//           <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
//             <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
//           </svg>
//         </div>
        
//         <div className="absolute bottom-2 left-1/3 text-white opacity-60">
//            <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
//             <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
//           </svg>
//         </div>
        
//         <div className="absolute top-4 right-16 text-white opacity-40">
//            <svg width="6" height="6" viewBox="0 0 24 24" fill="white">
//             <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
//           </svg>
//         </div>

//       </div>

//       {/* --- Text Content --- */}
//       <span className="relative z-10 font-sans text-2xl font-bold tracking-wide text-white drop-shadow-md">
//         Subscribe
//       </span>
//     </button>
//   );
// };

// export default ChristmasButton;








// import React from 'react';

// // 1. Define available color themes
// export type ChristmasButtonColor = 'orange' | 'emerald' | 'blue' | 'red' | 'purple' | 'slate';

// interface ChristmasButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   color?: ChristmasButtonColor;
// }

// // 2. Map colors to specific Tailwind classes
// const themeConfig: Record<ChristmasButtonColor, {
//   sky: string;
//   hillBack: string;
//   hillFront: string;
//   tree: string;
//   ring: string;
// }> = {
//   orange: {
//     sky: 'from-orange-300 to-orange-400',
//     hillBack: 'text-orange-500',
//     hillFront: 'text-orange-600',
//     tree: 'text-orange-900',
//     ring: 'focus:ring-orange-300',
//   },
//   emerald: {
//     sky: 'from-emerald-300 to-emerald-400',
//     hillBack: 'text-emerald-500',
//     hillFront: 'text-emerald-600',
//     tree: 'text-emerald-900',
//     ring: 'focus:ring-emerald-300',
//   },
//   blue: {
//     sky: 'from-sky-300 to-sky-400',
//     hillBack: 'text-sky-500',
//     hillFront: 'text-sky-600',
//     tree: 'text-sky-900',
//     ring: 'focus:ring-sky-300',
//   },
//   red: {
//     sky: 'from-rose-300 to-rose-400',
//     hillBack: 'text-rose-500',
//     hillFront: 'text-rose-600',
//     tree: 'text-rose-900',
//     ring: 'focus:ring-rose-300',
//   },
//   purple: {
//     sky: 'from-purple-300 to-purple-400',
//     hillBack: 'text-purple-500',
//     hillFront: 'text-purple-600',
//     tree: 'text-purple-900',
//     ring: 'focus:ring-purple-300',
//   },
//   slate: {
//     sky: 'from-slate-300 to-slate-400',
//     hillBack: 'text-slate-500',
//     hillFront: 'text-slate-600',
//     tree: 'text-slate-900',
//     ring: 'focus:ring-slate-300',
//   },
// };

// const ChristmasButton: React.FC<ChristmasButtonProps> = ({ 
//   children, // Now accepting children
//   color = 'orange', 
//   className = '',
//   ...props 
// }) => {
  
//   const theme = themeConfig[color];

//   return (
//     <button
//       className={`group relative h-16 min-w-[12rem] px-6 overflow-hidden rounded-2xl shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 ${theme.ring} ${className}`}
//       {...props}
//     >
//       {/* --- Background Sky --- */}
//       <div className={`absolute inset-0 bg-gradient-to-b ${theme.sky}`} />

//       {/* --- Decorative Elements Layer --- */}
//       <div className="absolute inset-0 pointer-events-none">
        
//         {/* Background Hill */}
//         <svg
//           className={`absolute bottom-0 left-0 w-full ${theme.hillBack}`}
//           viewBox="0 0 200 60"
//           preserveAspectRatio="none"
//         >
//           <path
//             fill="currentColor"
//             d="M0,60 L0,35 C30,35 50,15 80,25 C110,35 140,45 200,30 L200,60 Z"
//           />
//         </svg>

//         {/* Foreground Hill */}
//         <svg
//           className={`absolute bottom-0 left-0 w-full ${theme.hillFront}`}
//           viewBox="0 0 200 50"
//           preserveAspectRatio="none"
//         >
//           <path
//             fill="currentColor"
//             d="M0,60 L0,40 C20,40 40,20 70,30 C100,40 130,10 160,20 C180,25 190,40 200,45 L200,60 Z"
//           />
//         </svg>

//         {/* Pine Tree */}
//         <svg
//           className={`absolute bottom-[-5px] right-2 h-20 w-16 ${theme.tree}`}
//           viewBox="0 0 100 150"
//           fill="currentColor"
//         >
//           <path d="M50 0 L80 40 H65 L90 80 H70 L100 130 H0 L30 80 H10 L35 40 H20 Z" />
//         </svg>
        
//         {/* Small Silhouette Trees */}
//          <svg
//           className={`absolute bottom-0 left-4 h-10 w-8 ${theme.hillFront} opacity-80`}
//           viewBox="0 0 100 150"
//           fill="currentColor"
//         >
//           <path d="M50 10 L80 50 H20 Z M50 40 L90 90 H10 Z" />
//         </svg>
//         <svg
//           className={`absolute bottom-0 left-16 h-8 w-6 ${theme.hillFront} opacity-80`}
//           viewBox="0 0 100 150"
//           fill="currentColor"
//         >
//            <path d="M50 10 L80 50 H20 Z M50 40 L90 90 H10 Z" />
//         </svg>

//         {/* Stars/Snow */}
//         <div className="absolute top-2 left-3 text-white opacity-80 animate-pulse">
//           <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
//             <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
//           </svg>
//         </div>
        
//         <div className="absolute bottom-2 left-1/3 text-white opacity-60">
//            <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
//             <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
//           </svg>
//         </div>
        
//         <div className="absolute top-4 right-16 text-white opacity-40">
//            <svg width="6" height="6" viewBox="0 0 24 24" fill="white">
//             <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
//           </svg>
//         </div>

//       </div>

//       {/* --- Children (Text/Content) --- */}
//       <span className="relative z-10 font-sans text-2xl font-bold tracking-wide text-white drop-shadow-md">
//         {children}
//       </span>
//     </button>
//   );
// };

// export default ChristmasButton;






import React, { ElementType, ComponentPropsWithoutRef } from 'react';

// --- Types ---

export type ChristmasButtonColor = 'orange' | 'emerald' | 'blue' | 'red' | 'purple' | 'slate';

// Polymorphic props definition
type ChristmasButtonProps<T extends ElementType> = {
  as?: T;
  color?: ChristmasButtonColor;
  children?: React.ReactNode;
} & ComponentPropsWithoutRef<T>;

// --- Theme Configuration ---

const themeConfig: Record<ChristmasButtonColor, {
  sky: string;
  hillBack: string;
  hillFront: string;
  tree: string;
  ring: string;
}> = {
  orange: {
    sky: 'from-orange-300 to-orange-400',
    hillBack: 'text-orange-500',
    hillFront: 'text-orange-600',
    tree: 'text-orange-900',
    ring: 'focus:ring-orange-300',
  },
  emerald: {
    sky: 'from-emerald-300 to-emerald-400',
    hillBack: 'text-emerald-500',
    hillFront: 'text-emerald-600',
    tree: 'text-emerald-900',
    ring: 'focus:ring-emerald-300',
  },
  blue: {
    sky: 'from-sky-300 to-sky-400',
    hillBack: 'text-sky-500',
    hillFront: 'text-sky-600',
    tree: 'text-sky-900',
    ring: 'focus:ring-sky-300',
  },
  red: {
    sky: 'from-rose-300 to-rose-400',
    hillBack: 'text-rose-500',
    hillFront: 'text-rose-600',
    tree: 'text-rose-900',
    ring: 'focus:ring-rose-300',
  },
  purple: {
    sky: 'from-purple-300 to-purple-400',
    hillBack: 'text-purple-500',
    hillFront: 'text-purple-600',
    tree: 'text-purple-900',
    ring: 'focus:ring-purple-300',
  },
  slate: {
    sky: 'from-slate-300 to-slate-400',
    hillBack: 'text-slate-500',
    hillFront: 'text-slate-600',
    tree: 'text-slate-900',
    ring: 'focus:ring-slate-300',
  },
};

// --- Component ---

export default function ChristmasButton<T extends ElementType = 'button'>({
  as,
  color = 'orange',
  children,
  className = '',
  ...props
}: ChristmasButtonProps<T>) {
  
  const Component = as || 'button';
  const theme = themeConfig[color];

  return (
    <Component
      className={`
        relative group overflow-hidden 
        h-14 sm:h-16 px-8 min-w-[12rem]
        flex items-center justify-center
        rounded-2xl 
        border-2 border-[#3A1F10] 
        shadow-[1px_1px_0_0_rgba(0,0,0,0.8)] 
        transition-transform duration-200 
        hover:scale-105 active:scale-95 
        focus:outline-none focus:ring-2 ${theme.ring}
        cursor-pointer
        ${className}
      `}
      {...props}
    >
      {/* 1. Background Sky (Gradient) */}
      <div className={`absolute inset-0 bg-gradient-to-b ${theme.sky}`} />

      {/* 2. Decorative Scenery Layer (Hills, Trees, Stars) */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* Background Hill */}
        <svg className={`absolute bottom-0 left-0 w-full ${theme.hillBack}`} viewBox="0 0 200 60" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,60 L0,35 C30,35 50,15 80,25 C110,35 140,45 200,30 L200,60 Z" />
        </svg>

        {/* Foreground Hill */}
        <svg className={`absolute bottom-0 left-0 w-full ${theme.hillFront}`} viewBox="0 0 200 50" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,60 L0,40 C20,40 40,20 70,30 C100,40 130,10 160,20 C180,25 190,40 200,45 L200,60 Z" />
        </svg>

        {/* Pine Tree */}
        <svg className={`absolute bottom-[-5px] right-4 h-16 w-12 sm:h-20 sm:w-16 ${theme.tree}`} viewBox="0 0 100 150" fill="currentColor">
          <path d="M50 0 L80 40 H65 L90 80 H70 L100 130 H0 L30 80 H10 L35 40 H20 Z" />
        </svg>
        
        {/* Small Silhouette Trees */}
         <svg className={`absolute bottom-0 left-4 h-10 w-8 ${theme.hillFront} opacity-80`} viewBox="0 0 100 150" fill="currentColor">
          <path d="M50 10 L80 50 H20 Z M50 40 L90 90 H10 Z" />
        </svg>
        <svg className={`absolute bottom-0 left-16 h-8 w-6 ${theme.hillFront} opacity-80`} viewBox="0 0 100 150" fill="currentColor">
           <path d="M50 10 L80 50 H20 Z M50 40 L90 90 H10 Z" />
        </svg>

        {/* Stars/Snow */}
        <div className="absolute top-2 left-3 text-white opacity-80 animate-pulse">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
        <div className="absolute bottom-2 left-1/3 text-white opacity-60">
           <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
        <div className="absolute top-4 right-1/2 text-white opacity-40">
           <svg width="6" height="6" viewBox="0 0 24 24" fill="white">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      </div>

      {/* 3. Shine Overlay (From GlossyButton) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
        <div className="absolute top-0 left-[-150%] w-[250%] h-full animate-shine-slow">
          <svg viewBox="0 0 53 54" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <g opacity="0.2">
              <rect x="31.3149" y="-9" width="11" height="70" transform="rotate(26.574 31.3149 -9)" fill="#D9D9D9" />
              <rect x="47.3149" y="-7.4563" width="6.30956" height="70" transform="rotate(26.574 47.3149 -7.4563)" fill="#D9D9D9" />
            </g>
          </svg>
        </div>
      </div>

      {/* 4. Content */}
      <span className="relative z-30 font-sans text-xl sm:text-2xl font-bold tracking-wide text-white drop-shadow-md">
        {children}
      </span>
    </Component>
  );
}