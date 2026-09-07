"use client";

// Closing band on each academy page. The action scrolls back up to the
// in-page subject picker rather than jumping straight to the booking wizard.
import { motion, useReducedMotion } from "framer-motion";
import { riseOnce } from "@/lib/motion";
import type { Locale } from "@/lib/academies";
import { academyTheme } from "@/lib/academyTheme";

export default function AcademyCTA({
  prompt,
  subtitle,
  locale,
}: {
  prompt: string;
  subtitle: string;
  locale: Locale;
}) {
  const reduce = useReducedMotion() ?? false;
  const theme = academyTheme(locale);

  return (
    <section className="relative pb-14 md:pb-20 pt-2">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...riseOnce(reduce)}
          className={`rounded-[2rem] px-6 py-10 sm:px-10 sm:py-12 text-center shadow-lg ${theme.band}`}
        >
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight ${theme.bandHeading}`}
          >
            Ready to see how we&apos;d tailor a free trial?
          </h2>
          <p className={`mt-3 text-sm sm:text-base max-w-xl mx-auto ${theme.bandBody}`}>
            {subtitle}
          </p>

          <div className="mt-7 flex justify-center">
            <a
              href="#subject-picker"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("subject-picker")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`w-full sm:w-auto rounded-full px-8 py-3.5 text-sm sm:text-base font-bold shadow-md transition-colors ${theme.bandButton}`}
            >
              {prompt}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
