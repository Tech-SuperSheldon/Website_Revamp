"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";


interface RollingLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  baseColor?: string;
  hoverColor?: string;
}

export function RollingLink({ href, children, className = "", target, rel, baseColor = "text-slate-600", hoverColor = "text-orange-500" }: RollingLinkProps) {
  return (
    <Link 
        href={href} 
        className={`block w-fit h-[28px] group cursor-pointer ${className}`} 
        style={{ perspective: "1000px" }}
        target={target}
        rel={rel}
    >
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          initial={{ rotateX: 0 }}
          whileHover={{ rotateX: -90 }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
        >
          {/* Ghost Element to set width */}
          <span className="invisible block font-medium text-[17px] opacity-0" aria-hidden="true">
            {children}
          </span>

          {/* Front Face (Default) */}
          <span
            className={`absolute inset-0 flex items-center ${baseColor} font-medium text-[17px] bg-transparent whitespace-nowrap`}
            style={{ backfaceVisibility: 'hidden', transform: 'translateZ(14px)' }}
          >
            {children}
          </span>

          {/* Top Face (Rolls in from top) */}
          <span
            className={`absolute inset-0 flex items-center ${hoverColor} font-bold text-[17px] bg-transparent whitespace-nowrap`}
            style={{ backfaceVisibility: 'hidden', transform: 'rotateX(90deg) translateZ(14px)' }}
          >
            {children}
          </span>
        </motion.div>
    </Link>
  );
}

