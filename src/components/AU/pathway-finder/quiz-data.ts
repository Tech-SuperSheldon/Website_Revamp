// Pathway Finder — all quiz copy & data lives here so it's easy to edit.
// Three pathways mirror SuperSheldon's real exam-prep tracks (see src/lib/course-data.ts).

export type TrackKey = "naplan" | "icas" | "hsc";

export const TRACK_KEYS: TrackKey[] = ["naplan", "icas", "hsc"];

export interface Option {
  icon: string;
  label: string;
  scores: Record<TrackKey, number>; // 0–3 weighting per pathway
}

export interface Question {
  kind: string; // short tag shown above the question
  text: string;
  options: Option[]; // 3 options each
}

export interface Track {
  key: TrackKey;
  icon: string;
  name: string;
  shortName: string;
  tagline: string;
  color: string; // per-pathway accent (brand-compatible)
  reasons: string[];
  projects: string[]; // "what your child will work on" chips
  curriculum: { subject: string; outcome: string }[];
  outcomes: string; // exams / levels this prepares for
  programLink: string; // existing route to send the family to
}

// ─── QUESTIONS ────────────────────────────────────────────────
// Each option weights the 3 pathways 0–3. Every question has a "3"
// option for each pathway so a consistent picker maxes out at 27.
export const QUESTIONS: Question[] = [
  {
    kind: "Goal",
    text: "What matters most for your child right now?",
    options: [
      { icon: "🎯", label: "Strong school results and confidence in the basics", scores: { naplan: 3, icas: 0, hsc: 1 } },
      { icon: "🏆", label: "Standing out — competitions, awards, top percentiles", scores: { naplan: 0, icas: 3, hsc: 1 } },
      { icon: "🎓", label: "High-stakes senior exams and university entry", scores: { naplan: 1, icas: 1, hsc: 3 } },
    ],
  },
  {
    kind: "Year level",
    text: "Where is your child in their schooling?",
    options: [
      { icon: "🧒", label: "Primary years (roughly Years 2–6)", scores: { naplan: 3, icas: 2, hsc: 0 } },
      { icon: "🧑", label: "Middle years (Years 7–9)", scores: { naplan: 2, icas: 3, hsc: 1 } },
      { icon: "👩‍🎓", label: "Senior years (Years 10–12)", scores: { naplan: 0, icas: 1, hsc: 3 } },
    ],
  },
  {
    kind: "Motivation",
    text: "What lights your child up the most?",
    options: [
      { icon: "📚", label: "Keeping up and mastering the school syllabus", scores: { naplan: 3, icas: 0, hsc: 1 } },
      { icon: "🧩", label: "Tricky puzzles and problems beyond the classroom", scores: { naplan: 0, icas: 3, hsc: 1 } },
      { icon: "📈", label: "Hitting a specific grade or rank they care about", scores: { naplan: 1, icas: 1, hsc: 3 } },
    ],
  },
  {
    kind: "Pride",
    text: "Which moment would make you proudest?",
    options: [
      { icon: "🌟", label: "A clear jump in their NAPLAN band or report card", scores: { naplan: 3, icas: 1, hsc: 0 } },
      { icon: "🏅", label: "A High Distinction or medal in a competition", scores: { naplan: 0, icas: 3, hsc: 1 } },
      { icon: "🚀", label: "An ATAR that opens the university door they want", scores: { naplan: 0, icas: 1, hsc: 3 } },
    ],
  },
  {
    kind: "Style",
    text: "How does your child like to be challenged?",
    options: [
      { icon: "🪜", label: "Steady practice that builds solid foundations", scores: { naplan: 3, icas: 0, hsc: 1 } },
      { icon: "🔥", label: "Stretch problems that push past grade level", scores: { naplan: 0, icas: 3, hsc: 1 } },
      { icon: "⏱️", label: "Exam-style drills under real time pressure", scores: { naplan: 1, icas: 1, hsc: 3 } },
    ],
  },
  {
    kind: "Success",
    text: "A year from now, success looks like…",
    options: [
      { icon: "✅", label: "Confident, on top of class, no test anxiety", scores: { naplan: 3, icas: 0, hsc: 1 } },
      { icon: "🥇", label: "Recognised among the strongest students around", scores: { naplan: 0, icas: 3, hsc: 1 } },
      { icon: "📊", label: "On track for the marks that matter for the future", scores: { naplan: 1, icas: 1, hsc: 3 } },
    ],
  },
  {
    kind: "Focus",
    text: "Which focus feels most useful?",
    options: [
      { icon: "✏️", label: "Core literacy & numeracy aligned to school", scores: { naplan: 3, icas: 1, hsc: 0 } },
      { icon: "🔬", label: "Enrichment across English, Maths & Science", scores: { naplan: 1, icas: 3, hsc: 0 } },
      { icon: "📐", label: "Deep subject mastery for senior assessments", scores: { naplan: 0, icas: 1, hsc: 3 } },
    ],
  },
  {
    kind: "Support",
    text: "What kind of guidance do you want?",
    options: [
      { icon: "🧭", label: "Fill gaps and reinforce what's taught at school", scores: { naplan: 3, icas: 0, hsc: 1 } },
      { icon: "🚀", label: "Extend a capable child beyond the standard", scores: { naplan: 0, icas: 3, hsc: 1 } },
      { icon: "🎯", label: "Strategy and structure for the final-years grind", scores: { naplan: 1, icas: 1, hsc: 3 } },
    ],
  },
  {
    kind: "Dream",
    text: "Your big hope for them?",
    options: [
      { icon: "😊", label: "Loves learning and believes in themselves", scores: { naplan: 3, icas: 1, hsc: 0 } },
      { icon: "🌍", label: "Stands out early and builds an impressive record", scores: { naplan: 0, icas: 3, hsc: 1 } },
      { icon: "🏛️", label: "Gets into a top course or university", scores: { naplan: 0, icas: 1, hsc: 3 } },
    ],
  },
];

// ─── PATHWAYS (results) ───────────────────────────────────────
export const TRACKS: Record<TrackKey, Track> = {
  naplan: {
    key: "naplan",
    icon: "📘",
    name: "NAPLAN & School Mastery",
    shortName: "NAPLAN Prep",
    tagline: "Build rock-solid school foundations and walk into NAPLAN with confidence.",
    color: "#F15D22",
    reasons: [
      "Your child thrives on steady progress — closing gaps and staying ahead of the class.",
      "NAPLAN bands and report-card confidence are what matter most right now.",
    ],
    projects: [
      "Reading comprehension",
      "Narrative & persuasive writing",
      "Spelling & grammar",
      "Numeracy fundamentals",
      "Timed practice tests",
      "Band-level feedback",
    ],
    curriculum: [
      { subject: "Reading & Comprehension", outcome: "Understanding any text with confidence" },
      { subject: "Writing Craft", outcome: "Narrative and persuasive pieces that score" },
      { subject: "Language Conventions", outcome: "Spelling, grammar and punctuation mastery" },
      { subject: "Numeracy Foundations", outcome: "Number, measurement and problem solving" },
      { subject: "Full Practice Tests", outcome: "Real exam conditions, no surprises" },
      { subject: "Personalised Feedback", outcome: "Know exactly what to improve next" },
    ],
    outcomes: "Year 3 · Year 5 · Year 7 · Year 9 NAPLAN · School confidence · Stronger report cards",
    programLink: "/au/naplan-exam",
  },
  icas: {
    key: "icas",
    icon: "🏆",
    name: "ICAS & Academic Enrichment",
    shortName: "ICAS Enrichment",
    tagline: "Stretch a curious, capable child beyond the classroom — and onto the podium.",
    color: "#7C3AED",
    reasons: [
      "Your child loves a challenge and is ready to push past grade level.",
      "You want recognition — competitions, awards and a standout academic record.",
    ],
    projects: [
      "Olympiad-style problems",
      "Critical thinking",
      "Advanced English",
      "Extension Maths",
      "Science reasoning",
      "Competition strategy",
    ],
    curriculum: [
      { subject: "Higher-Order Thinking", outcome: "Tackling problems beyond the syllabus" },
      { subject: "Advanced English", outcome: "Comprehension and vocabulary at depth" },
      { subject: "Extension Mathematics", outcome: "Reasoning that wins competitions" },
      { subject: "Scientific Reasoning", outcome: "Thinking like a young scientist" },
      { subject: "Competition Technique", outcome: "Strategy for ICAS and Olympiads" },
      { subject: "Enrichment Projects", outcome: "Curiosity turned into achievement" },
    ],
    outcomes: "ICAS (English · Maths · Science) · Academic competitions · Extension & gifted programs",
    programLink: "/au/courses",
  },
  hsc: {
    key: "hsc",
    icon: "🎓",
    name: "HSC & Senior Mastery",
    shortName: "HSC / Senior",
    tagline: "Master senior subjects and chase the ATAR that opens the right doors.",
    color: "#2563EB",
    reasons: [
      "Your child is in the senior years where every mark counts.",
      "You want structure, strategy and subject depth for high-stakes exams.",
    ],
    projects: [
      "Subject deep-dives",
      "Past-paper mastery",
      "Essay & response technique",
      "Exam time strategy",
      "Assessment prep",
      "ATAR goal tracking",
    ],
    curriculum: [
      { subject: "Subject Mastery", outcome: "Deep command of senior content" },
      { subject: "Exam Technique", outcome: "Maximising marks under pressure" },
      { subject: "Past-Paper Practice", outcome: "Familiarity with every question type" },
      { subject: "Written Responses", outcome: "Essays and answers that earn full marks" },
      { subject: "Assessment Strategy", outcome: "Staying ahead across the year" },
      { subject: "ATAR Planning", outcome: "A clear path to the goal score" },
    ],
    outcomes: "HSC · Year 11 & 12 · ATAR preparation · University entry",
    programLink: "/au/courses",
  },
};

// ─── COMPARE TABLE ────────────────────────────────────────────
export interface CompareRow {
  dimension: string;
  naplan: string;
  icas: string;
  hsc: string;
}

export const COMPARE: CompareRow[] = [
  {
    dimension: "Core focus",
    naplan: "School syllabus & NAPLAN bands",
    icas: "Enrichment & competitions",
    hsc: "Senior subjects & ATAR",
  },
  {
    dimension: "Best for",
    naplan: "Building confidence in core subjects",
    icas: "Curious, capable extenders",
    hsc: "High-stakes senior prep",
  },
  {
    dimension: "Typical year levels",
    naplan: "Years 2–9",
    icas: "Years 2–10",
    hsc: "Years 10–12",
  },
  {
    dimension: "You'll focus on",
    naplan: "Literacy, numeracy & test technique",
    icas: "Higher-order thinking & olympiad problems",
    hsc: "Subject mastery & exam strategy",
  },
  {
    dimension: "Proof of success",
    naplan: "Higher NAPLAN bands & report cards",
    icas: "Awards, distinctions & rankings",
    hsc: "Strong ATAR & uni entry",
  },
  {
    dimension: "Leads toward",
    naplan: "Confidence & solid foundations",
    icas: "A standout academic record",
    hsc: "University pathways",
  },
];
