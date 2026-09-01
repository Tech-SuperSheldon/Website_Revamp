"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

function getDeadlineInfo() {
  const now = new Date();
  const currentDay = now.getDate();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Rolling deadline: if today is past the 30th, roll to next month
  let deadlineMonth = currentMonth;
  let deadlineYear = currentYear;

  if (currentDay > 30) {
    deadlineMonth++;
    if (deadlineMonth > 11) {
      deadlineMonth = 0;
      deadlineYear++;
    }
  }

  // Batch starts the month after the deadline month
  let batchMonth = deadlineMonth + 1;
  let batchYear = deadlineYear;
  if (batchMonth > 11) {
    batchMonth = 0;
    batchYear++;
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // Handle months with fewer than 30 days (Feb)
  const lastDay = new Date(deadlineYear, deadlineMonth + 1, 0).getDate();
  const deadlineDay = Math.min(30, lastDay);

  // Deadline expires at the end of the deadline day (23:59:59)
  const deadlineDate = new Date(
    deadlineYear,
    deadlineMonth,
    deadlineDay,
    23, 59, 59, 999
  );

  return {
    deadline: `${deadlineDay} ${monthNames[deadlineMonth]} ${deadlineYear}`,
    batchStart: `${monthNames[batchMonth]} ${batchYear}`,
    deadlineDate,
  };
}

function getTimeLeft(deadlineDate: Date) {
  const diff = Math.max(0, deadlineDate.getTime() - Date.now());

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    isUrgent: diff > 0 && diff <= 5 * 24 * 60 * 60 * 1000,
    expired: diff <= 0,
  };
}

export default function NSDeadlineBanner() {
  const [dismissed, setDismissed] = useState(false);

  const info = useMemo(() => getDeadlineInfo(), []);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(info.deadlineDate));

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft(info.deadlineDate));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [info.deadlineDate]);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={false}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-[9997] w-full bg-[#FFCC00] text-black shadow-md"
        >
          <div className="max-w-7xl mx-auto px-4 py-1.5 sm:py-2.5 flex items-center justify-between gap-3">
            {/* Left: Icon + Text */}
            <div className="flex items-center gap-2 sm:gap-2.5 flex-1 min-w-0">
              <div className="hidden sm:flex shrink-0 w-7 h-7 rounded-full bg-black/10 items-center justify-center">
                <Clock size={14} className="text-black" />
              </div>
              <div className="flex flex-row items-center gap-x-1.5 sm:gap-x-2 min-w-0">
                {/* Mobile: one condensed row — deadline date + countdown. The
                    batch-start text is desktop-only; with it back in, that's
                    the line that pushed this to 3 stacked rows on mobile. */}
                <p className="min-w-0 flex-1 sm:flex-initial text-[11px] sm:text-sm font-medium leading-tight truncate">
                  <span className="font-bold">Application Deadline:</span>{" "}
                  {info.deadline}
                  <span className="hidden sm:inline font-semibold">
                    {" "}| Next batch starts {info.batchStart}
                  </span>
                </p>
                {!timeLeft.expired && (
                  <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
                    <Calendar size={10} className="hidden sm:inline opacity-90" />
                    {[
                      { value: timeLeft.days, label: "d" },
                      { value: timeLeft.hours, label: "h" },
                      { value: timeLeft.minutes, label: "m" },
                      { value: timeLeft.seconds, label: "s" },
                    ].map((unit, idx) => (
                      <span
                        key={unit.label}
                        className="inline-flex items-baseline gap-0.5 bg-black/10 px-1 py-0.5 rounded text-[9px] sm:px-1.5 sm:text-[10px] font-bold tabular-nums"
                      >
                        {String(unit.value).padStart(2, "0")}
                        <span className="opacity-80">{unit.label}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right: CTA + Close */}
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/demo"
                data-floating-cta-avoid
                className="hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-[#8a6800] to-[#c99700] text-white text-xs font-bold px-3 py-1.5 rounded-full border border-black/10 hover:from-[#775900] hover:to-[#b38a00] transition-colors shadow-sm shadow-black/20"
              >
                Apply for Demo
                <ArrowRight size={12} />
              </Link>
              <button
                onClick={() => setDismissed(true)}
                className="text-black/60 hover:text-black transition-colors p-0.5 sm:p-1 rounded-full hover:bg-black/10"
                aria-label="Dismiss banner"
              >
                <X size={14} className="sm:hidden" />
                <X size={16} className="hidden sm:block" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
