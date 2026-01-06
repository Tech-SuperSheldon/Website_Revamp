"use client";

import React from "react";

export function BackgroundGrid() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none h-full w-full bg-white">
      <div 
        className="absolute h-full w-full"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(128, 128, 128, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(128, 128, 128, 0.15) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        }}
      />
    </div>
  );
}
