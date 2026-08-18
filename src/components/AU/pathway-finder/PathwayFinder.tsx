"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QUESTIONS } from "./quiz-data";
import { scoreAnswers, type ScoreResult } from "./scoring";
import WelcomeScreen from "./screens/WelcomeScreen";
import QuizScreen from "./screens/QuizScreen";
import LoadingScreen from "./screens/LoadingScreen";
import ResultsScreen from "./screens/ResultsScreen";
import CompareScreen from "./screens/CompareScreen";

type Screen = "welcome" | "quiz" | "loading" | "results" | "compare";

const fade = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: "easeOut" as const },
};

function scrollTop() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export default function PathwayFinder() {
  const [screen, setScreen] = useState<Screen>("welcome");
  // Where "Compare" was opened from, so its Back button returns there.
  const [compareReturn, setCompareReturn] = useState<Screen>("welcome");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    Array(QUESTIONS.length).fill(null)
  );
  const [result, setResult] = useState<ScoreResult | null>(null);

  const go = useCallback((s: Screen) => {
    setScreen(s);
    scrollTop();
  }, []);

  const startQuiz = useCallback(() => {
    setAnswers(Array(QUESTIONS.length).fill(null));
    setCurrentQ(0);
    setResult(null);
    go("quiz");
  }, [go]);

  const pick = useCallback(
    (idx: number) => {
      setAnswers((prev) => {
        const next = [...prev];
        next[currentQ] = idx;
        return next;
      });
    },
    [currentQ]
  );

  const next = useCallback(() => {
    if (answers[currentQ] === null) return;
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ((q) => q + 1);
      scrollTop();
    } else {
      setResult(scoreAnswers(answers));
      go("loading");
      // brief "analysing" beat before revealing the match
      window.setTimeout(() => go("results"), 1200);
    }
  }, [answers, currentQ, go]);

  const back = useCallback(() => {
    if (currentQ > 0) {
      setCurrentQ((q) => q - 1);
      scrollTop();
    }
  }, [currentQ]);

  const openCompare = useCallback(() => {
    setCompareReturn(screen);
    go("compare");
  }, [screen, go]);

  const closeCompare = useCallback(() => go(compareReturn), [compareReturn, go]);

  return (
    <div className="px-4 pb-24 pt-28 sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-3xl">
        <AnimatePresence mode="wait">
          {screen === "welcome" && (
            <motion.div key="welcome" {...fade}>
              <WelcomeScreen onStart={startQuiz} onCompare={openCompare} />
            </motion.div>
          )}

          {screen === "quiz" && (
            <motion.div key="quiz" {...fade}>
              <QuizScreen
                index={currentQ}
                total={QUESTIONS.length}
                question={QUESTIONS[currentQ]}
                selected={answers[currentQ]}
                onPick={pick}
                onBack={back}
                onNext={next}
              />
            </motion.div>
          )}

          {screen === "loading" && (
            <motion.div key="loading" {...fade}>
              <LoadingScreen />
            </motion.div>
          )}

          {screen === "results" && result && (
            <motion.div key="results" {...fade}>
              <ResultsScreen
                result={result}
                onCompare={openCompare}
                onRetake={startQuiz}
              />
            </motion.div>
          )}

          {screen === "compare" && (
            <motion.div key="compare" {...fade}>
              <CompareScreen onBack={closeCompare} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
