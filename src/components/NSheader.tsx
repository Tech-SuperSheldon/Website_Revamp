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

export function Header({ stacked = false }: { stacked?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Transform values for pill effect
  const headerWidth = useTransform(scrollY, [0, 100], ["100%", "82%"]);
  const headerTop = useTransform(scrollY, [0, 100], ["0px", "16px"]);
  const headerRadius = useTransform(scrollY, [0, 100], ["0px", "50px"]);
  const headerPadding = useTransform(scrollY, [0, 100], ["0.85rem", "0.45rem"]);
  // The logo will start 2.2x larger, and scale up to 2.5x when scrolled
  const logoScale = useTransform(scrollY, [0, 100], [2.2, 2.5]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
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
          style={{
            width: headerWidth,
            marginTop: headerTop,
            borderRadius: headerRadius,
          }}
          className={`pointer-events-auto mx-auto transition-all duration-300 ease-in-out
            ${isScrolled
              ? "bg-white/70 backdrop-blur-md shadow-lg border border-white/20 max-w-4xl"
              : "bg-white w-full border-b border-gray-100 shadow-sm"
            }
          `}
        >
          {/* ── Removed initial opacity=0 and delay here so it loads instantly ── */}
          <motion.div
            style={{ paddingTop: headerPadding, paddingBottom: headerPadding }}
            className="container mx-auto px-4 flex items-center justify-between gap-2 transition-all"
          >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 w-16 sm:w-20 md:w-24 shrink-0">
            <motion.div
              style={{ scale: logoScale }}
              className="relative h-8 w-8 shrink-0 origin-left sm:h-10 sm:w-10 md:h-10 md:w-10"
            >
              <Image
                src="/logo.png"
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
            <Link href="/demo" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="gradient" className="rounded-full px-6 py-5 text-base shadow-md transition-all hover:shadow-lg hover:shadow-orange-500/20 whitespace-nowrap">
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
             <Link href="/demo" onClick={() => setIsMobileMenuOpen(false)} className="w-full max-w-[280px]">
                <Button className="w-full bg-gray-900 text-white rounded-full px-6 py-4 text-lg">
                    Try a free Class
                </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}