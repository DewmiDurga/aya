// Detects symptom/message content that should be flagged for a doctor visit
// rather than answered purely conversationally by the chatbot.

const RED_FLAG_KEYWORDS = [
  "missed period for 3 months",
  "no period for 3 months",
  "extremely heavy bleeding",
  "soaking through a pad every hour",
  "severe pelvic pain",
  "fainting",
  "chest pain",
  "bleeding between periods for weeks",
  "pregnant and bleeding",
  "period lasting more than 10 days"
];

export function checkForRedFlags(message: string): { flagged: boolean; matched: string[] } {
  const lower = message.toLowerCase();
  const matched = RED_FLAG_KEYWORDS.filter((kw) => lower.includes(kw));
  return { flagged: matched.length > 0, matched };
}

export const RED_FLAG_DISCLAIMER =
  "This sounds like something worth discussing with a gynecologist or doctor directly — " +
  "I can share general information, but I'm not able to diagnose or replace a medical exam.";
