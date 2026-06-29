"use client";

import { useState, useMemo } from "react";
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

  // Check urgency: within last 5 days of deadline
  const isUrgent =
    deadlineMonth === currentMonth &&
    currentDay >= deadlineDay - 5 &&
    currentDay <= deadlineDay;

  return {
    deadline: `${deadlineDay} ${monthNames[deadlineMonth]} ${deadlineYear}`,
    batchStart: `${monthNames[batchMonth]} ${batchYear}`,
    isUrgent,
    daysLeft: deadlineMonth === currentMonth ? deadlineDay - currentDay : deadlineDay,
  };
}

export default function NSDeadlineBanner() {
  const [dismissed, setDismissed] = useState(false);

  const info = useMemo(() => getDeadlineInfo(), []);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`relative z-[9997] w-full ${
            info.isUrgent
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
                {info.isUrgent && (
                  <span className="ml-1.5 inline-flex items-center gap-1 bg-white/20 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">
                    <Calendar size={10} />
                    {info.daysLeft} {info.daysLeft === 1 ? "day" : "days"} left
                  </span>
                )}
              </p>
            </div>

            {/* Right: CTA + Close */}
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/demo"
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
