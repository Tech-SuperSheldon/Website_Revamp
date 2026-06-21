"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

import { RollingLink } from "./RollingLink";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Testimonial", href: "/testimonial" },
  { name: "Blogs", href: "/blogs" },
  { name: "Become a Teacher", href: "/become-a-teacher" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Transform values for pill effect
  const headerWidth = useTransform(scrollY, [0, 100], ["100%", "97%"]);
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
            ? "bg-white/70 backdrop-blur-md shadow-lg border border-white/20" 
            : "bg-white/0 w-full border-b border-transparent"
          }
        `}
      >
        <motion.div 
          style={{ paddingTop: headerPadding, paddingBottom: headerPadding }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="container mx-auto px-6 flex items-center justify-between transition-all"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28 md:h-32 md:w-32">
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
              <RollingLink key={link.name} href={link.href}>
                {link.name}
              </RollingLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="https://supersheldon.wise.live/login?loginRedirected=true" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Login
            </Link>
            <Link href="/demo" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="gradient" className="rounded-full px-8 py-6 text-lg shadow-md transition-all hover:shadow-lg hover:shadow-orange-500/20">
                    Try a free Class
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
                className="text-3xl font-medium text-gray-800 hover:text-purple-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px w-full bg-gray-100 my-2" />
            <Link href="https://supersheldon.wise.live/login?loginRedirected=true" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-medium text-gray-600">
              Login
            </Link>
             <Link href="/demo" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-gray-900 text-white rounded-full px-8 py-8 text-2xl">
                    Try a free Class
                </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
