"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import NSReviewsHeader from "./NSReviewsHeader";
import NSReviewForm from "./NSReviewForm";
import NSReviewCard from "./NSReviewCard";
import { reviews, Review } from "@/lib/review-data-us";

/** Slowly auto-scrolling column — direction: "up" | "down" */
function ScrollingColumn({
  reviews: items,
  direction,
  speed = 0.4,
}: {
  reviews: Review[];
  direction: "up" | "down";
  speed?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const yPos = useMotionValue(0);
  useAnimationFrame((_, delta) => {
    const el = containerRef.current;
    if (!el) return;

    const half = el.scrollHeight / 2;
    let next = yPos.get() + (direction === "up" ? -1 : 1) * speed * (delta / 16);

    // Seamless loop: when halfway scrolled, reset to origin
    if (direction === "up" && next <= -half) next = 0;
    if (direction === "down" && next >= 0) next = -half;

    yPos.set(next);
  });

  // Double the items for infinite loop
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden" style={{ height: "70vh" }}>
      <motion.div ref={containerRef} style={{ y: yPos }}>
        {doubled.map((review, i) => (
          <NSReviewCard key={`${review.id}-${i}`} review={review} />
        ))}
      </motion.div>
    </div>
  );
}

export default function NSReviewsUS() {
  const leftColumnReviews = reviews.filter((_, i) => i % 2 === 0);
  const rightColumnReviews = reviews.filter((_, i) => i % 2 !== 0);

  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const check = () => setIsLg(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-white font-sans pb-24 pt-32 md:pt-40">
        <div className="container mx-auto px-4 max-w-7xl">
          <NSReviewsHeader />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Side: Submit Form - Sticky */}
            <div className="lg:col-span-4 sticky top-24 z-10">
              <NSReviewForm />
            </div>

            {/* Right Side: Reviews Masonry Grid */}
            <div className="lg:col-span-8">
              {isLg ? (
                /* ── Large screens: auto-scrolling columns ── */
                <div className="grid grid-cols-2 gap-6">
                  {/* Column 1 — scrolls UP */}
                  <ScrollingColumn reviews={leftColumnReviews} direction="up" speed={0.35} />

                  {/* Column 2 — scrolls DOWN, slightly offset */}
                  <ScrollingColumn reviews={rightColumnReviews} direction="down" speed={0.35} />
                </div>
              ) : (
                /* ── Mobile / tablet: static stacked grid ── */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    {leftColumnReviews.map((review) => (
                      <NSReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                  <div className="space-y-6 md:mt-12">
                    {rightColumnReviews.map((review) => (
                      <NSReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
