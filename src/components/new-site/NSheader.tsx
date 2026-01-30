"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Testimonial", href: "/testimonials" },
  { name: "Blogs", href: "/blogs" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Transform values for pill effect
  const headerWidth = useTransform(scrollY, [0, 100], ["100%", "90%"]);
  const headerTop = useTransform(scrollY, [0, 100], ["0px", "16px"]);
  const headerRadius = useTransform(scrollY, [0, 100], ["0px", "50px"]);
  const headerPadding = useTransform(scrollY, [0, 100], ["1.5rem", "0.3rem"]); // py-6 to almost py-1

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        style={{
          width: headerWidth,
          top: headerTop,
          borderRadius: headerRadius,
        }}
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out
          ${isScrolled 
            ? "bg-white/70 backdrop-blur-md shadow-lg border border-white/20 max-w-5xl" 
            : "bg-white/0 backdrop-blur-sm w-full border-b border-transparent"
          }
        `}
      >
        <motion.div 
          style={{ paddingTop: headerPadding, paddingBottom: headerPadding }}
          className="container mx-auto px-6 flex items-center justify-between transition-all"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-16 h-16 md:w-24 md:h-24">
                 <Image 
                    src="/logo.png" 
                    alt="SuperSheldon Logo" 
                    fill 
                    className="object-contain"
                 />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors text-sm"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Login
            </Link>
            <Link href="/try-class">
                <Button variant="gradient" className="rounded-full px-6 shadow-md transition-all hover:shadow-lg hover:shadow-orange-500/20">
                    Try a Free Class
                </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </motion.div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col gap-6 items-center"
          >
             {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-xl font-medium text-gray-800 hover:text-purple-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px w-full bg-gray-100 my-2" />
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-gray-600">
              Login
            </Link>
             <Link href="/try-class" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-gray-900 text-white rounded-full px-8 py-6 text-lg">
                    Try a Free Class
                </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
