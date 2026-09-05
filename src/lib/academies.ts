// Single source of truth for the academy pages under <base>/academies, where
// <base> is "" (global), "/uk" or "/au".
//
// Each academy owns a route with the shared hero banner, its own subject list
// + copy, a per-academy variant of the four-step "How we tailor every lesson"
// journey (NSProcess), an FAQ and a closing CTA. The /academies index keeps
// only the banner and heading; the detail lives here.
//
// The global site is the base content. The UK and AU sites reuse it with a
// handful of region-specific overrides — exam lists and any copy that names an
// exam — so there is still one place to edit shared wording.

export type Locale = "global" | "uk" | "au";

export const LOCALES: Locale[] = ["global", "uk", "au"];

/** URL prefix for a locale's pages: "" | "/uk" | "/au". */
export const BASE_PATH: Record<Locale, string> = {
  global: "",
  uk: "/uk",
  au: "/au",
};

/** Booking wizard for a locale. There is no /uk/demo — the UK site's own
 *  header already sends "Try a free Class" to the shared /demo. */
export const DEMO_PATH: Record<Locale, string> = {
  global: "/demo",
  uk: "/demo",
  au: "/au/demo",
};

/** Market passed to LearnForm inside BookTrialModal. */
export const MARKET: Record<Locale, "uk" | "au"> = {
  global: "uk",
  uk: "uk",
  au: "au",
};

export type AcademyStep = {
  /** Must stay in NSProcess' order: Diagnose, Match, Personalise, Review. */
  title: string;
  desc: string;
};

export type AcademyFaq = { q: string; a: string };

export type ExamRow = {
  region: "UK" | "Australia" | "Both";
  exam: string;
  status: "Statutory" | "Optional";
  who: string;
};

export type Academy = {
  /** URL segment under <base>/academies. */
  slug: string;
  /** Matches the key used by the header dropdown. */
  key: "tuition" | "exam" | "skill";
  letter: string;
  accent: string;
  /** Product name as it appears in the nav — e.g. "Tuition Academy". */
  name: string;
  /** Page <h1> — the outcome the academy is named for. */
  heading: string;
  description: string;
  subjects: string[];
  /** Placeholder inside the subject <select>. */
  placeholder: string;
  /** Label above the picker and on the closing CTA. */
  prompt: string;
  stepsSubtitle: string;
  steps: AcademyStep[];
  faqs: AcademyFaq[];
  ctaSubtitle: string;
  /** Only Exam Readiness lists further exams beyond its headline ones. */
  examTable?: { title: string; intro: string; rows: ExamRow[] };
  metaTitle: string;
  metaDescription: string;
};

const NAVY = "#0b2545";
const ORANGE = "#FC8741";

/** Where we teach. Flags are local SVGs under public/flags — flag *emoji*
 *  fall back to bare letter pairs ("GB", "NZ") on Windows, which is what the
 *  rest of the codebase's country pickers still show. */
export const REGIONS: { label: string; flag: string }[] = [
  { label: "UK", flag: "/flags/GB.svg" },
  { label: "Australia", flag: "/flags/AU.svg" },
  { label: "USA", flag: "/flags/US.svg" },
  { label: "Europe", flag: "/flags/EU.svg" },
  { label: "New Zealand", flag: "/flags/NZ.svg" },
];

/** Every exam the curriculum team covers beyond the headline ones. Each
 *  locale's table is a filter of this list, so a new exam is added once. */
const EXAM_ROWS: ExamRow[] = [
  {
    region: "UK",
    exam: "ISEB Common Pre-Test",
    status: "Optional",
    who: "Year 6–7, for senior independent school registration.",
  },
  {
    region: "UK",
    exam: "7+ / 8+ Entrance Exams",
    status: "Optional",
    who: "Ages 6–8, for early independent/prep school entry.",
  },
  { region: "UK", exam: "KS2 SATs", status: "Statutory", who: "Year 6." },
  {
    region: "Australia",
    exam: "NSW Selective School / OC Placement Test",
    status: "Optional",
    who: "For Selective High School or Opportunity Class entry.",
  },
  {
    region: "Australia",
    exam: "Victorian Selective Entry (incl. HAST)",
    status: "Optional",
    who: "Year 8, for Year 9 entry.",
  },
  {
    region: "Both",
    exam: "ICAS",
    status: "Optional",
    who: "Years 2 upward, both UK and Australian schools.",
  },
];

const examRowsFor = (locale: Locale): ExamRow[] =>
  locale === "global"
    ? EXAM_ROWS
    : EXAM_ROWS.filter(
        (row) => row.region === "Both" || row.region === (locale === "uk" ? "UK" : "Australia")
      );

/** Base (global) content. UK/AU start from this and override the pieces that
 *  name a region-specific exam. */
const BASE: Academy[] = [
  {
    slug: "school-readiness",
    key: "tuition",
    letter: "T",
    accent: NAVY,
    name: "Tuition Academy",
    heading: "School Readiness",
    description:
      "Everyday subject support that keeps pace with — or gets ahead of — your child's school curriculum. Built for steady, confident progress across the core subjects.",
    subjects: ["Maths", "Science", "English", "Reasoning"],
    placeholder: "Select a subject",
    prompt: "Pick a subject to start",
    stepsSubtitle: "The same four-step journey, tailored to everyday subject support.",
    steps: [
      {
        title: "Diagnose",
        desc: "A free diagnostic test reveals exactly where your child stands in Maths, Science, English or Reasoning against their school curriculum.",
      },
      {
        title: "Match",
        desc: "We pair your child with a vetted 1:1 subject tutor — plus an AI sidekick for homework help and extra practice between lessons.",
      },
      {
        title: "Personalise",
        desc: "Every lesson plan adapts in real time to what's actually being taught in your child's classroom, not a fixed textbook.",
      },
      {
        title: "Review",
        desc: "Regular diagnostic check-ins and PTMs keep you and the tutor aligned on real progress, term after term.",
      },
    ],
    faqs: [
      {
        q: "Is this the same as exam preparation?",
        a: "No — School Readiness is everyday subject support for the school curriculum. If your child is preparing for a specific exam like the 11+ or NAPLAN, see Exam Readiness instead.",
      },
      {
        q: "Which curriculum do you follow?",
        a: "We align to the UK National Curriculum or the Australian Curriculum based on your child's school, adjusting as their classwork moves.",
      },
      {
        q: "What ages is this for?",
        a: "School Readiness supports students aged 5–15.",
      },
      {
        q: "Can we switch subjects later?",
        a: "Yes — most families start with one subject and add others once they see how it works.",
      },
    ],
    ctaSubtitle: "Pick a subject and we'll match your child with the right 1:1 tutor.",
    metaTitle:
      "School Readiness | 1:1 Maths, Science, English & Reasoning Tutoring | SuperSheldon",
    metaDescription:
      "Everyday subject support that keeps pace with — or gets ahead of — your child's school curriculum. 1:1 tutor, free diagnostic, personalised trial.",
  },
  {
    slug: "exam-readiness",
    key: "exam",
    letter: "E",
    accent: ORANGE,
    name: "Exam Academy",
    heading: "Exam Readiness",
    description:
      "Focused, timeline-driven preparation for major entrance and standardised exams — built around past papers, timed practice and diagnostic tracking.",
    subjects: ["11+ Exam", "NAPLAN"],
    placeholder: "Select an exam",
    prompt: "Pick an exam to start",
    stepsSubtitle: "The same four-step journey, tailored to your exam's timeline.",
    steps: [
      {
        title: "Diagnose",
        desc: "A free mock test, run in real exam conditions, reveals exactly where your child stands against the exam they're sitting.",
      },
      {
        title: "Match",
        desc: "We pair your child with a tutor who specialises in that specific exam's format — plus an AI sidekick for timed practice between lessons.",
      },
      {
        title: "Personalise",
        desc: "Every study plan counts backward from exam day, broken into weekly milestones instead of a fixed syllabus.",
      },
      {
        title: "Review",
        desc: "Progress is tracked against real exam benchmarks, with PTMs scheduled around key milestones — mid-prep and the final countdown.",
      },
    ],
    examTable: {
      title: "Also preparing for other exams?",
      intro:
        "Tell us your child's year/grade and we'll point you to the right prep — including these additional UK and Australia exams our curriculum team covers.",
      rows: examRowsFor("global"),
    },
    faqs: [
      {
        q: "How do I know which exams apply to my child?",
        a: "Tell us your child's year/grade and we'll show you only the exams relevant to that age.",
      },
      {
        q: "Is this different from normal tutoring?",
        a: "Yes — it's focused on the specific exam's past papers, timing and format, tracked against a diagnostic, not general subject support.",
      },
      {
        q: "What if my child is preparing for a school-specific test not listed here?",
        a: "Get in touch — we can scope a plan around other school-specific entrance tests too.",
      },
      {
        q: "How far in advance should we start?",
        a: "Starting with a free diagnostic at least 2–3 months before the exam date gives the clearest picture of what needs to change.",
      },
    ],
    ctaSubtitle: "Pick an exam and we'll build a plan around the date that matters.",
    metaTitle: "Exam Readiness | 11+, NAPLAN & Selective School Prep | SuperSheldon",
    metaDescription:
      "Focused, timeline-driven preparation for major entrance and standardised exams — built around past papers, timed practice and diagnostic tracking.",
  },
  {
    slug: "skill",
    key: "skill",
    letter: "S",
    accent: NAVY,
    name: "Skill Academy",
    heading: "Skill Development",
    description:
      "The things school doesn't always have room for — sharp thinking, real coding ability, and the confidence to speak and write clearly.",
    subjects: [
      "Vedic Maths",
      "Chess",
      "Coding",
      "AI (Coding, Gen AI, Agent Building)",
      "Public Speaking + Creative Writing",
    ],
    placeholder: "Select a skill",
    prompt: "Pick a skill to start",
    stepsSubtitle: "The same four-step journey, tailored to mastering a skill.",
    steps: [
      {
        title: "Diagnose",
        desc: "A free taster session reveals your child's starting point and genuine interest — no 'wrong level' here, just an honest baseline.",
      },
      {
        title: "Match",
        desc: "We pair your child with a specialist mentor in that exact skill — plus an AI practice partner for extra reps between sessions.",
      },
      {
        title: "Personalise",
        desc: "Every skill path adapts to your child's own pace, not a fixed term calendar.",
      },
      {
        title: "Review",
        desc: "Regular showcases and PTMs — a finished project, a chess milestone, a delivered speech — keep you and the mentor aligned on real progress.",
      },
    ],
    faqs: [
      {
        q: "Does my child need existing experience to start?",
        a: "No — the free trial is designed to find a genuine starting point, whether your child is a beginner or already has experience.",
      },
      {
        q: "Is this exam preparation?",
        a: "No — Skill Academy is separate from exam-specific work. If your child also needs 11+ or NAPLAN prep, that's covered under Exam Readiness.",
      },
      {
        q: "Can my child try more than one skill?",
        a: "Yes — most families start with one skill and add a second once they see how it works for their child.",
      },
    ],
    ctaSubtitle: "Pick a skill and we'll match your child with the right mentor.",
    metaTitle:
      "Skill Academy | Vedic Maths, Chess, Coding, AI & Public Speaking | SuperSheldon",
    metaDescription:
      "The things school doesn't always have room for — sharp thinking, real coding ability, and the confidence to speak and write clearly.",
  },
];

/** Swap individual FAQ answers by their question text. Throws if a question no
 *  longer exists, so editing the base copy can't silently drop an override. */
function reword(faqs: AcademyFaq[], replacements: Record<string, string>): AcademyFaq[] {
  for (const q of Object.keys(replacements)) {
    if (!faqs.some((f) => f.q === q)) throw new Error(`No FAQ with question: ${q}`);
  }
  return faqs.map((f) => (f.q in replacements ? { ...f, a: replacements[f.q] } : f));
}

type Override = Partial<
  Pick<Academy, "subjects" | "examTable" | "faqs" | "metaTitle" | "metaDescription">
>;

const overridesFor = (locale: Exclude<Locale, "global">): Record<string, Override> => {
  const uk = locale === "uk";
  const base = (slug: string) => BASE.find((a) => a.slug === slug)!;

  return {
    "school-readiness": {
      faqs: reword(base("school-readiness").faqs, {
        "Is this the same as exam preparation?": uk
          ? "No — School Readiness is everyday subject support for the school curriculum. If your child is preparing for a specific exam like the 11+, see Exam Readiness instead."
          : "No — School Readiness is everyday subject support for the school curriculum. If your child is preparing for a specific exam like NAPLAN, see Exam Readiness instead.",
        "Which curriculum do you follow?": uk
          ? "We align to the UK National Curriculum, adjusting as your child's classwork moves."
          : "We align to the Australian Curriculum, adjusting as your child's classwork moves.",
      }),
    },
    "exam-readiness": {
      subjects: uk ? ["11+ Exam"] : ["NAPLAN"],
      examTable: {
        title: "Also preparing for other exams?",
        intro: uk
          ? "Tell us your child's year/grade and we'll point you to the right prep — including these additional UK exams our curriculum team covers."
          : "Tell us your child's year/grade and we'll point you to the right prep — including these additional Australian exams our curriculum team covers.",
        rows: examRowsFor(locale),
      },
      metaTitle: uk
        ? "Exam Readiness | 11+, ISEB & KS2 SATs Prep | SuperSheldon"
        : "Exam Readiness | NAPLAN, Selective School & ICAS Prep | SuperSheldon",
    },
    skill: {
      faqs: reword(base("skill").faqs, {
        "Is this exam preparation?": uk
          ? "No — Skill Academy is separate from exam-specific work. If your child also needs 11+ prep, that's covered under Exam Readiness."
          : "No — Skill Academy is separate from exam-specific work. If your child also needs NAPLAN prep, that's covered under Exam Readiness.",
      }),
    },
  };
};

const BY_LOCALE: Record<Locale, Academy[]> = {
  global: BASE,
  uk: BASE.map((a) => ({ ...a, ...overridesFor("uk")[a.slug] })),
  au: BASE.map((a) => ({ ...a, ...overridesFor("au")[a.slug] })),
};

export function getAcademies(locale: Locale): Academy[] {
  return BY_LOCALE[locale];
}

export function getAcademy(locale: Locale, slug: string): Academy {
  const academy = BY_LOCALE[locale].find((a) => a.slug === slug);
  if (!academy) throw new Error(`Unknown academy slug: ${slug}`);
  return academy;
}

/** Header dropdown entries for a locale. */
export function academyMenu(locale: Locale) {
  return getAcademies(locale).map((a) => ({
    name: a.name,
    subtitle: a.heading,
    letter: a.letter,
    accent: a.accent,
    href: `${BASE_PATH[locale]}/academies/${a.slug}`,
  }));
}
