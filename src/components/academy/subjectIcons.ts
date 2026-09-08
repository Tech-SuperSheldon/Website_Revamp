// Icon per subject chip on the academy pages. Keyed by the exact subject
// string in src/lib/academies.ts — add an entry here when a subject is added
// there, otherwise the chip falls back to the generic sparkle.
import {
  Award,
  BookOpen,
  Calculator,
  ClipboardCheck,
  ClipboardList,
  Code2,
  Cpu,
  Crown,
  FlaskConical,
  Globe2,
  GraduationCap,
  Lightbulb,
  Medal,
  Mic,
  Puzzle,
  ScrollText,
  Sigma,
  Sparkles,
  Stethoscope,
  Target,
  Trophy,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

const SUBJECT_ICONS: Record<string, LucideIcon> = {
  // Tuition Academy
  Maths: Calculator,
  Science: FlaskConical,
  English: BookOpen,
  Reasoning: Puzzle,
  // Exam Academy — UK (the global site offers both markets' exams)
  SAT: GraduationCap,
  GCSE: ScrollText,
  IGCSE: Globe2,
  "11+ Examination": ClipboardList,
  "A Level / A+ Level": Award,
  // Exam Academy — Australia
  NAPLAN: ClipboardCheck,
  "Selective Scholarship": Trophy,
  ICAS: Medal,
  ACER: Target,
  GATE: Lightbulb,
  ATAR: TrendingUp,
  UCAT: Stethoscope,
  // Skill Academy
  "Vedic Maths": Sigma,
  Chess: Crown,
  Coding: Code2,
  "AI (Coding, Gen AI, Agent Building)": Cpu,
  "Public Speaking + Creative Writing": Mic,
};

export function subjectIcon(subject: string): LucideIcon {
  return SUBJECT_ICONS[subject] ?? Sparkles;
}
