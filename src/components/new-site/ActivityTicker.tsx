"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACTIVITY_ITEMS = [
  "Priya from Sydney just applied · 2 min ago",
  "James from London was approved · 5 min ago",
  "Meera from Melbourne just applied · 8 min ago",
  "Oliver from Manchester started onboarding · 12 min ago",
  "Anika from Brisbane just applied · 15 min ago",
  "Ravi from Birmingham was approved · 18 min ago",
  "Sophie from Perth just applied · 21 min ago",
  "Aarav from Leeds started teaching · 25 min ago",
];

interface ActivityTickerProps {
  intervalMs?: number;
}

export default function ActivityTicker({ intervalMs = 4500 }: ActivityTickerProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ACTIVITY_ITEMS.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return (
    <div className="inline-flex items-center gap-2 bg-white/80 border border-orange-100 rounded-full px-4 py-2 shadow-sm text-sm overflow-hidden max-w-full">
      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
      <div className="overflow-hidden h-5 flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="block text-[#4E5566] font-medium truncate"
          >
            {ACTIVITY_ITEMS[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
