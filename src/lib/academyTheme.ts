// Per-site palette for the academy pages.
//
// All three sites now run the global yellow/navy academy look — /uk and /au
// keep their own header, footer and booking links, but the academy body copy,
// CTAs and FAQ match /academies exactly. The per-locale map stays so a site can
// be forked back off later without touching the components.
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

// Kept identical to GLOBAL so /uk/academies matches /academies exactly.
const UK: AcademyTheme = { ...GLOBAL };

// Same for /au/academies — the academies run one shared yellow/navy look on
// all three sites; only the surrounding header/footer stay per-site.
const AU: AcademyTheme = { ...GLOBAL };

export const ACADEMY_THEMES: Record<Locale, AcademyTheme> = {
  global: GLOBAL,
  uk: UK,
  au: AU,
};

export const academyTheme = (locale: Locale): AcademyTheme => ACADEMY_THEMES[locale];
