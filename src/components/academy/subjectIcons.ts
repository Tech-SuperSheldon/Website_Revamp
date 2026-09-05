// Icon per subject chip on the academy pages. Keyed by the exact subject
// string in src/lib/academies.ts — add an entry here when a subject is added
// there, otherwise the chip falls back to the generic sparkle.
import {
  BookOpen,
  Calculator,
  ClipboardCheck,
  ClipboardList,
  Code2,
  Cpu,
  Crown,
  FlaskConical,
  Mic,
  Puzzle,
  Sigma,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const SUBJECT_ICONS: Record<string, LucideIcon> = {
  // Tuition Academy
  Maths: Calculator,
  Science: FlaskConical,
  English: BookOpen,
  Reasoning: Puzzle,
  // Exam Academy
  "11+ Exam": ClipboardList,
  NAPLAN: ClipboardCheck,
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
