"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

import { RollingLink } from "./RollingLink";
import { academyMenu } from "@/lib/academies";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Academies", href: "/academies" },
  { name: "Testimonial", href: "/new-testimonial" },
  { name: "Blogs", href: "/new-blogs" },
  { name: "Become a Teacher", href: "/become-a-teacher" },
];

// Hover menu under "Academies". Each entry opens that academy's own page under
// /academies/<slug>; the entries come from the same data the pages render, so
// a rename can't drift between the nav and the page.
const ACADEMY_MENU = academyMenu("global");

export function Header({ stacked = false }: { stacked?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileAcademiesOpen, setIsMobileAcademiesOpen] = useState(false);
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
            {navLinks.map((link) =>
              link.name === "Academies" ? (
                <div key={link.name} className="relative group">
                  <RollingLink href={link.href}>
                    <span className="inline-flex items-center gap-1">
                      {link.name}
                      <ChevronDown
                        size={14}
                        className="transition-transform duration-200 group-hover:rotate-180"
                      />
                    </span>
                  </RollingLink>

                  {/* Hover panel. The pt-3 spacer keeps the pointer inside the
                      group while it travels from the link down to the menu. */}
                  <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 invisible opacity-0 translate-y-1 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0">
                    <div className="w-64 rounded-2xl bg-white border border-gray-100 shadow-xl p-2">
                      {ACADEMY_MENU.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-[#FFCC00]/15 transition-colors"
                        >
                          <span
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold shrink-0"
                            style={{ background: item.accent }}
                          >
                            {item.letter}
                          </span>
                          <span className="flex flex-col leading-tight">
                            <span className="text-sm font-semibold text-gray-900">{item.name}</span>
                            <span className="text-[11px] text-gray-500">{item.subtitle}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <RollingLink key={link.name} href={link.href}>
                  {link.name}
                </RollingLink>
              )
            )}
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
            onClick={() => {
              setIsMobileMenuOpen((open) => !open);
              setIsMobileAcademiesOpen(false);
            }}
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
            {navLinks.map((link) =>
              link.name === "Academies" ? (
                <div key={link.name} className="flex w-full max-w-[280px] flex-col items-center">
                  <button
                    type="button"
                    aria-expanded={isMobileAcademiesOpen}
                    aria-controls="mobile-academies-menu"
                    onClick={() => setIsMobileAcademiesOpen((open) => !open)}
                    className="flex items-center gap-1.5 text-xl font-medium text-gray-800 hover:text-purple-600 transition-colors"
                  >
                    {link.name}
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-300 ${isMobileAcademiesOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isMobileAcademiesOpen && (
                      <motion.div
                        id="mobile-academies-menu"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="w-full overflow-hidden"
                      >
                        <div className="flex flex-col items-center gap-2 pt-3">
                          {ACADEMY_MENU.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="text-base font-medium text-gray-500 hover:text-orange-500 transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xl font-medium text-gray-800 hover:text-purple-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            )}
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