




// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import Popup from "./Popup";
// import GlossyButton from "./GlossyButton";

// const navLinks = [
//   { href: "/", label: "Home", type: "link" },
//   { href: "/courses", label: "Courses", type: "link" },
//   { href: "#testimonial", label: "Testimonial", type: "anchor" },
// ];

// export const Button = ({ children, className = "", variant = "primary", ...props }) => {
//   const base =
//     "px-5 py-1.5 rounded-full font-medium transition-all text-sm focus:outline-none shadow-sm";
//   const variants = {
//     primary:
//       "bg-gradient-to-r from-[#FFD700] to-[#FF9500] hover:from-[#FFC93C] hover:to-[#FF8C00] text-white",
//     outline:
//       "border border-gray-300 text-gray-700 hover:border-black hover:text-black",
//     login: "bg-[#FF8C00] hover:bg-[#FF9933] text-white",
//   };
//   return (
//     <button className={`${base} ${variants[variant]} ${className}`} {...props}>
//       {children}
//     </button>
//   );
// };

// export default function Header() {
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 30);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <header className="fixed top-0 w-full z-50 flex justify-center">
//       <Popup />
//       <nav
//         className={`flex items-center justify-between transition-all duration-300 ${
//           scrolled
//             ? "mt-3 w-[94%] rounded-full bg-white/80 backdrop-blur-lg shadow-md px-10 py-0.1"
//             : "w-full px-10 py-5"
//         }`}
//       >
//         {/* Logo */}
//         <Link href="/" className="flex items-center">
//           <Image
//             src="/logo.png"
//             alt="SuperSheldon Logo"
//             width={160} // slightly smaller
//             height={40}
//             priority
//           />
//         </Link>

//         {/* Center Nav inside grey pill */}
//         <div className="hidden md:flex bg-gray-100 rounded-full px-6 py-1.5 space-x-10">
//           {navLinks.map((link) =>
//             link.type === "link" ? (
//               <Link
//                 key={link.label}
//                 href={link.href}
//                 className="text-gray-700 font-medium hover:text-black transition-colors"
//               >
//                 {link.label}
//               </Link>
//             ) : (
//               <a
//                 key={link.label}
//                 href={link.href}
//                 className="text-gray-700 font-medium hover:text-black transition-colors"
//               >
//                 {link.label}
//               </a>
//             )
//           )}
//         </div>

//         {/* Right side buttons */}
//         <div className="hidden md:flex items-center space-x-4">
//           <Link href="/login">
//             {/* <Button variant="primary" className="px-4 py-1.5 text-sm">
//               Login
//             </Button> */}
//             <GlossyButton >Login</GlossyButton>
//           </Link>
//           <Link
//       href="https://forms.gle/csc94GLG3tEDit6N6"
//       target="_blank"
//       rel="noopener noreferrer"
//           ><GlossyButton>
//             Try a free Class
//           </GlossyButton>
//         </Link>
//         </div>
//       </nav>
//     </header>
//   );
// }









// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import Popup from "./Popup";
// import GlossyButton from "./GlossyButton";
// import { Menu, X } from "lucide-react"; // for hamburger menu

// const navLinks = [
//   { href: "/", label: "Home", type: "link" },
//   { href: "/courses", label: "Courses", type: "link" },
//   { href: "#testimonial", label: "Testimonial", type: "anchor" },
// ];

// export const Button = ({
//   children,
//   className = "",
//   variant = "primary",
//   ...props
// }) => {
//   const base =
//     "px-5 py-1.5 rounded-full font-medium transition-all text-sm focus:outline-none shadow-sm";
//   const variants = {
//     primary:
//       "bg-gradient-to-r from-[#FFD700] to-[#FF9500] hover:from-[#FFC93C] hover:to-[#FF8C00] text-white",
//     outline:
//       "border border-gray-300 text-gray-700 hover:border-black hover:text-black",
//     login: "bg-[#FF8C00] hover:bg-[#FF9933] text-white",
//   };
//   return (
//     <button className={`${base} ${variants[variant]} ${className}`} {...props}>
//       {children}
//     </button>
//   );
// };

// export default function Header() {
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 30);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <header className="fixed top-0 w-full z-50 flex justify-center">
//       <Popup />
//       <nav
//         className={`flex items-center justify-between transition-all duration-300 ${
//           scrolled
//             ? "mt-3 w-[94%] rounded-full bg-white/80 backdrop-blur-lg shadow-md px-6 py-2"
//             : "w-full px-6 py-5"
//         }`}
//       >
//         {/* Logo */}
//         <Link href="/" className="flex items-center">
//           <Image
//             src="/logo.png"
//             alt="SuperSheldon Logo"
//             width={160}
//             height={40}
//             priority
//           />
//         </Link>

//         {/* Desktop Nav */}
//         <div className="hidden md:flex bg-gray-100 rounded-full px-6 py-1.5 space-x-10">
//           {navLinks.map((link) =>
//             link.type === "link" ? (
//               <Link
//                 key={link.label}
//                 href={link.href}
//                 className="text-gray-700 font-medium hover:text-black transition-colors"
//               >
//                 {link.label}
//               </Link>
//             ) : (
//               <a
//                 key={link.label}
//                 href={link.href}
//                 className="text-gray-700 font-medium hover:text-black transition-colors"
//               >
//                 {link.label}
//               </a>
//             )
//           )}
//         </div>

//         {/* Desktop Right side buttons */}
//         <div className="hidden md:flex items-center space-x-4">
//           <Link href="/login">
//             <GlossyButton>Login</GlossyButton>
//           </Link>
//           <Link
//             href="https://forms.gle/csc94GLG3tEDit6N6"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <GlossyButton>Try a free Class</GlossyButton>
//           </Link>
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden flex items-center">
//           <button onClick={() => setMenuOpen(!menuOpen)}>
//             {menuOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Dropdown Menu */}
//       {menuOpen && (
//         <div className="absolute top-20 left-0 w-full bg-white/95 backdrop-blur-md shadow-lg flex flex-col items-center space-y-4 py-6 md:hidden z-40">
//           {navLinks.map((link) =>
//             link.type === "link" ? (
//               <Link
//                 key={link.label}
//                 href={link.href}
//                 onClick={() => setMenuOpen(false)}
//                 className="text-gray-700 font-medium hover:text-black transition-colors"
//               >
//                 {link.label}
//               </Link>
//             ) : (
//               <a
//                 key={link.label}
//                 href={link.href}
//                 onClick={() => setMenuOpen(false)}
//                 className="text-gray-700 font-medium hover:text-black transition-colors"
//               >
//                 {link.label}
//               </a>
//             )
//           )}
//           <Link href="/login" onClick={() => setMenuOpen(false)}>
//             <GlossyButton>Login</GlossyButton>
//           </Link>
//           <Link
//             href="https://forms.gle/csc94GLG3tEDit6N6"
//             target="_blank"
//             rel="noopener noreferrer"
//             onClick={() => setMenuOpen(false)}
//           >
//             <GlossyButton>Try a free Class</GlossyButton>
//           </Link>
//         </div>
//       )}
//     </header>
//   );
// }







"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import UKPopup from "./UKPopup";
import GlossyButton from "../GlossyButton";
import { Menu, X } from "lucide-react";
import { useOpenDemoBooking } from "../utils/navigation";

import UKGlossyButton from "./UKGlossybutton";

const navLinks = [
  { href: "/uk", label: "Home", type: "link" },
  { href: "/uk/courses", label: "Courses", type: "link" },
  { href: "/uk/testimonial", label: "Testimonial", type: "anchor" },
  { href: "/uk/blogs", label: "Blogs", type: "anchor" },
];

export const Button = ({
  children,
  className = "",
  variant = "primary",
  ...props
}) => {
  const base =
    "px-5 py-1.5 rounded-full font-medium transition-all text-sm focus:outline-none shadow-sm";
  const variants = {
    primary:
      "bg-gradient-to-r from-[#FFD700] to-[#FF9500] hover:from-[#FFC93C] hover:to-[#FF8C00] text-white",
    outline:
      "border border-gray-300 text-gray-700 hover:border-black hover:text-black",
    login: "bg-[#FF8C00] hover:bg-[#FF9933] text-white",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default function UKHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const openDemoBooking = useOpenDemoBooking();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <header className="fixed top-0 w-full z-50 flex justify-center">
      <UKPopup />
      <nav
        className={`flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "mt-3 w-[94%] rounded-full bg-white/80 backdrop-blur-lg shadow-md px-6 py-2"
            : "w-full px-6 py-5"
        }`}
      >
        {/* Logo */}
        <Link href="/uk" className="flex items-center">
          <Image
            src="/logo.png"
            alt="SuperSheldon Logo"
            width={160}
            height={40}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex bg-gray-100 rounded-full px-6 py-1.5 space-x-10">
          {navLinks.map((link) =>
            link.type === "link" ? (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-700 font-medium hover:text-black transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-700 font-medium hover:text-black transition-colors"
              >
                {link.label}
              </a>
            )
          )}
        </div>

        {/* Desktop Right side buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <UKGlossyButton onClick={openDemoBooking}>Try a free Class</UKGlossyButton>
         </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg flex flex-col items-center space-y-4 py-6 md:hidden z-40">
          {navLinks.map((link) =>
            link.type === "link" ? (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 font-medium hover:text-black transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 font-medium hover:text-black transition-colors"
              >
                {link.label}
              </a>
            )
          )}
          <Link href="https://web.wise.live/signup?loginRedirected=true" onClick={() => alert('Redirecting to wise.live')}>
            <UKGlossyButton>Login</UKGlossyButton>
          </Link>
          <UKGlossyButton onClick={openDemoBooking}>Try a free Class</UKGlossyButton>
        </div>
      )}
    </header>
  );
}
