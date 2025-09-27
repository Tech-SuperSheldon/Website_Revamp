"use client";

import Hero from "./Hero";
import Credits from "./Credits";

export default function HeroWithCredits() {
  return (
    <section className="relative w-full">
      {/* Gradient background behind both Hero and Credits */}
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full" />
      </div>

      {/* Hero */}
      <Hero />

      {/* Credits sits directly under Hero */}
      <Credits />
    </section>
  );
}
