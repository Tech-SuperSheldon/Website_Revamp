"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Question } from "../quiz-data";

interface Props {
  index: number;
  total: number;
  question: Question;
  selected: number | null;
  onPick: (i: number) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function QuizScreen({
  index,
  total,
  question,
  selected,
  onPick,
  onBack,
  onNext,
}: Props) {
  const pct = (index / total) * 100;
  const isLast = index === total - 1;

  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-500"
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
        <span className="text-sm font-semibold tabular-nums text-slate-500">
          {index + 1} / {total}
        </span>
      </div>

      <span className="mt-6 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange-600">
        {question.kind}
      </span>
      <h2 className="mt-3 text-2xl font-bold text-[#0D1B2A] sm:text-3xl">
        {question.text}
      </h2>

      <div className="mt-6 space-y-3">
        {question.options.map((o, i) => {
          const active = selected === i;
          return (
            <button
              key={i}
              onClick={() => onPick(i)}
              className={cn(
                "flex w-full items-center gap-4 rounded-2xl border-2 bg-white p-4 text-left transition",
                active
                  ? "border-orange-500 bg-orange-50 shadow-md"
                  : "border-slate-200 hover:border-orange-300 hover:bg-orange-50/40"
              )}
            >
              <span className="text-2xl">{o.icon}</span>
              <span className="flex-1 font-medium text-slate-700">{o.label}</span>
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition",
                  active
                    ? "border-orange-500 bg-orange-500 text-white"
                    : "border-slate-300 text-transparent"
                )}
              >
                ✓
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className={cn(
            "text-sm font-semibold text-slate-500 transition hover:text-orange-500",
            index === 0 && "invisible"
          )}
        >
          ← Back
        </button>
        <Button onClick={onNext} disabled={selected === null} variant="gradient" size="xl">
          {isLast ? "See My Result" : "Next"} →
        </Button>
      </div>
    </div>
  );
}
