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
          className={`relative z-[9997] w-full ${
            timeLeft.isUrgent
              ? "bg-gradient-to-r from-red-500 to-orange-500"
              : "bg-gradient-to-r from-orange-500 to-orange-400"
          } text-white shadow-md`}
        >
          <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
            {/* Left: Icon + Text */}
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <div className="shrink-0 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <Clock size={14} className="text-white" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-x-2 gap-y-0.5 min-w-0">
                <p className="text-xs sm:text-sm font-medium leading-tight truncate">
                  <span className="font-bold">Application Deadline:</span>{" "}
                  {info.deadline}
                  <span className="hidden sm:inline"> · </span>
                  <span className="sm:hidden block text-[10px] opacity-90 mt-0.5">
                    Next batch starts {info.batchStart}
                  </span>
                  <span className="hidden sm:inline font-semibold">
                    {" "}| Next batch starts {info.batchStart}
                  </span>
                </p>
                {!timeLeft.expired && (
                  <div className="flex items-center gap-1 shrink-0">
                    <Calendar size={10} className="hidden sm:inline opacity-90" />
                    {[
                      { value: timeLeft.days, label: "d" },
                      { value: timeLeft.hours, label: "h" },
                      { value: timeLeft.minutes, label: "m" },
                      { value: timeLeft.seconds, label: "s" },
                    ].map((unit, idx) => (
                      <span
                        key={unit.label}
                        className="inline-flex items-baseline gap-0.5 bg-white/20 px-1.5 py-0.5 rounded text-[10px] font-bold tabular-nums"
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
                href="/au/demo"
                className="hidden sm:inline-flex items-center gap-1.5 bg-white text-orange-600 text-xs font-bold px-3 py-1.5 rounded-full hover:bg-orange-50 transition-colors shadow-sm"
              >
                Apply for Demo
                <ArrowRight size={12} />
              </Link>
              <button
                onClick={() => setDismissed(true)}
                className="text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                aria-label="Dismiss banner"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
