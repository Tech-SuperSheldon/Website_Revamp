// Per-site palette for the academy pages.
//
// The three sites already have their own identity elsewhere — the global site
// is yellow/navy, /uk is blue (see UKHomeHeader's "from-blue-500 to-blue-700"
// CTA and the blue section headings), /au is orange (#e87f1e). These are the
// class strings the academy components need so one set of components can serve
// all three without a fork.
import type { Locale } from "@/lib/academies";

export type AcademyTheme = {
  /** Page/section headings. */
  heading: string;
  /** The word inside <Highlight> and the bar behind it. */
  highlightText: string;
  highlightBar: string;
  /** Subject chip icons. */
  icon: string;
  /** Primary filled button (hero picker card). */
  cta: string;
  /** Focus ring + hover border on the subject <select>. */
  selectFocus: string;
  /** Closing CTA band: gradient, its button, and the body copy on it. */
  band: string;
  bandHeading: string;
  bandBody: string;
  bandButton: string;
  /** Exam table header row. */
  tableHead: string;
  /** FAQ accordion. */
  faqOpen: string;
  faqIdle: string;
  faqDotOpen: string;
  faqDotIdle: string;
  faqQuestionOpen: string;
  /** NSProcess overrides — omitted for sites that use its default orange. */
  process?: {
    accent: string;
    trackIdle: string;
    trackFill: string;
    cardBorder: string;
    numberIdleBorder: string;
  };
};

const GLOBAL: AcademyTheme = {
  heading: "text-[#03215F]",
  highlightText: "text-[#FFCC00]",
  highlightBar: "bg-[#ffede2]",
  icon: "text-[#FC8741]",
  cta: "bg-[#FFCC00] text-black hover:bg-[#e6b800]",
  selectFocus: "hover:border-[#e6b800] focus:ring-[#FFCC00]",
  band: "bg-gradient-to-br from-[#FFCC00] to-[#FC8741]",
  bandHeading: "text-[#03215F]",
  bandBody: "text-[#4a3510]",
  bandButton: "bg-[#03215F] text-white hover:bg-[#0b2f7d]",
  tableHead: "bg-[#0b2545]",
  faqOpen: "bg-[#fff7f2] border-[#fec5a4]",
  faqIdle: "bg-white border-[#ffede2] hover:border-[#fedbc6] hover:bg-[#fff7f2]/50",
  faqDotOpen: "bg-[#fc8741] text-white",
  faqDotIdle: "bg-[#ffede2] text-[#e37a3a] group-hover:bg-[#fc8741] group-hover:text-white",
  faqQuestionOpen: "text-[#7e4420]",
};

const UK: AcademyTheme = {
  heading: "text-[#1e3a8a]",
  highlightText: "text-[#2563eb]",
  highlightBar: "bg-[#dbeafe]",
  icon: "text-[#2563eb]",
  cta: "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800",
  selectFocus: "hover:border-blue-400 focus:ring-blue-500",
  band: "bg-gradient-to-br from-blue-500 to-blue-700",
  bandHeading: "text-white",
  bandBody: "text-blue-50",
  bandButton: "bg-white text-[#1d4ed8] hover:bg-blue-50",
  tableHead: "bg-[#1e3a8a]",
  faqOpen: "bg-[#eff6ff] border-[#93c5fd]",
  faqIdle: "bg-white border-[#dbeafe] hover:border-[#bfdbfe] hover:bg-[#eff6ff]/50",
  faqDotOpen: "bg-[#2563eb] text-white",
  faqDotIdle: "bg-[#dbeafe] text-[#1d4ed8] group-hover:bg-[#2563eb] group-hover:text-white",
  faqQuestionOpen: "text-[#1e3a8a]",
  process: {
    accent: "#2563eb",
    trackIdle: "#eff6ff",
    trackFill: "from-blue-300 to-blue-600",
    cardBorder: "border-blue-100",
    numberIdleBorder: "#bfdbfe",
  },
};

const AU: AcademyTheme = {
  heading: "text-[#7c3a00]",
  highlightText: "text-[#e87f1e]",
  highlightBar: "bg-[#ffedd5]",
  icon: "text-[#e87f1e]",
  cta: "bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:from-orange-500 hover:to-orange-700",
  selectFocus: "hover:border-orange-400 focus:ring-orange-500",
  band: "bg-gradient-to-br from-orange-400 to-orange-600",
  bandHeading: "text-white",
  bandBody: "text-orange-50",
  bandButton: "bg-white text-[#c2410c] hover:bg-orange-50",
  tableHead: "bg-[#7c3a00]",
  faqOpen: "bg-[#fff7ed] border-[#fdba74]",
  faqIdle: "bg-white border-[#ffedd5] hover:border-[#fed7aa] hover:bg-[#fff7ed]/50",
  faqDotOpen: "bg-[#e87f1e] text-white",
  faqDotIdle: "bg-[#ffedd5] text-[#c2410c] group-hover:bg-[#e87f1e] group-hover:text-white",
  faqQuestionOpen: "text-[#7c3a00]",
};

export const ACADEMY_THEMES: Record<Locale, AcademyTheme> = {
  global: GLOBAL,
  uk: UK,
  au: AU,
};

export const academyTheme = (locale: Locale): AcademyTheme => ACADEMY_THEMES[locale];
