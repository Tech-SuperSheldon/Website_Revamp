import { QUESTIONS, TRACK_KEYS, type TrackKey } from "./quiz-data";

export interface ScoreResult {
  winner: TrackKey;
  totals: Record<TrackKey, number>;
  percentages: Record<TrackKey, number>;
  sortedKeys: TrackKey[];
  confidence: "clear" | "close" | "tie";
}

// Every question offers a "3" for each pathway, so a perfectly consistent
// picker tops out at 27. Used to turn raw totals into percentages.
const MAX_PER_TRACK = 27;

// Honest scoring: sum each pathway's weights, highest total wins.
// Ties broken deterministically by the fixed TRACK_KEYS order.
export function scoreAnswers(answers: (number | null)[]): ScoreResult {
  const totals: Record<TrackKey, number> = { naplan: 0, icas: 0, hsc: 0 };

  QUESTIONS.forEach((q, i) => {
    const a = answers[i];
    if (a !== null && a !== undefined) {
      const s = q.options[a].scores;
      totals.naplan += s.naplan;
      totals.icas += s.icas;
      totals.hsc += s.hsc;
    }
  });

  // Stable sort keeps TRACK_KEYS order when totals are equal (the tiebreak).
  const sortedKeys = [...TRACK_KEYS].sort((a, b) => totals[b] - totals[a]);
  const winner = sortedKeys[0];

  const margin = totals[winner] - totals[sortedKeys[1]];
  const confidence = margin >= 5 ? "clear" : margin >= 2 ? "close" : "tie";

  const percentages: Record<TrackKey, number> = {
    naplan: Math.round((totals.naplan / MAX_PER_TRACK) * 100),
    icas: Math.round((totals.icas / MAX_PER_TRACK) * 100),
    hsc: Math.round((totals.hsc / MAX_PER_TRACK) * 100),
  };

  return { winner, totals, percentages, sortedKeys, confidence };
}
