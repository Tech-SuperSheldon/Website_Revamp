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
  { name: "Courses", href: "/new-courses" },
  { name: "Testimonial", href: "/new-testimonial" },
  { name: "Blogs", href: "/new-blogs" },
  { name: "Become a Teacher", href: "/become-a-teacher" },
];

export function Header({ stacked = false }: { stacked?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // The logo will start 2.2x larger, and scale up to 2.5x when scrolled
  const logoScale = useTransform(scrollY, [0, 100], [2.2, 2.5]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/*
        ── `stacked` (used on /new-home): sticky + in normal flow, so it sits
           BELOW the deadline strip and ABOVE the hero — no overlap.
        ── default: fixed overlay (unchanged behavior for all other pages).
        Centering uses mx-auto on the inner pill box so it works in both modes.
      */}
      <motion.header
        className={`${stacked ? "sticky" : "fixed"} inset-x-0 top-0 z-50 pointer-events-none`}
      >
        {/* Pill box: full-width bar at top, shrinks to a centered floating pill on scroll */}
        <motion.div
          className={`pointer-events-auto mx-auto transition-all duration-300 ease-in-out
            ${isScrolled
              ? "w-[82%] mt-4 rounded-[50px] bg-white/70 backdrop-blur-md shadow-lg border border-white/20 max-w-4xl"
              : "w-full mt-0 rounded-none bg-white border-b border-gray-100 shadow-sm"
            }
          `}
        >
          {/* ── Removed initial opacity=0 and delay here so it loads instantly ── */}
          <motion.div
            className={`container mx-auto px-4 flex items-center justify-between gap-2 transition-all
              ${isScrolled ? "py-[0.45rem]" : "py-[0.85rem]"}
            `}
          >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 w-16 sm:w-20 md:w-24 shrink-0">
            <motion.div
              style={{ scale: logoScale }}
              className="relative h-8 w-8 shrink-0 origin-left sm:h-10 sm:w-10 md:h-10 md:w-10"
            >
              <Image
                src="/logo.webp"
                alt="SuperSheldon Logo"
                fill
                priority // ── Added priority so the logo downloads immediately ──
                className="object-contain"
              />
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-6">
            {navLinks.map((link) => (
              <RollingLink key={link.name} href={link.href}>
                {link.name}
              </RollingLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="https://supersheldon.wise.live/login?loginRedirected=true" target="_blank" rel="noopener noreferrer" className="text-base font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Login
            </Link>
            <Link href="/demo" data-floating-cta-avoid onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="gradient" className="rounded-full px-6 py-5 text-base shadow-md transition-all hover:shadow-lg hover:shadow-yellow-500/30 whitespace-nowrap bg-none bg-[#FFCC00] from-transparent to-transparent text-black hover:bg-[#e6b800] hover:opacity-100">
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
                className="text-xl font-medium text-gray-800 hover:text-purple-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px w-full bg-gray-100 my-2" />
            <Link 
              href="https://supersheldon.wise.live/login?loginRedirected=true" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-lg font-medium text-gray-600"
            >
              Login
            </Link>
             <Link href="/demo" data-floating-cta-avoid onClick={() => setIsMobileMenuOpen(false)} className="w-full max-w-[280px]">
                <Button className="w-full bg-[#FFCC00] hover:bg-[#e6b800] text-black rounded-full px-6 py-4 text-lg">
                    Try a free Class
                </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}