export interface RedFlagCheckResult {
  hasRedFlags: boolean;
  detectedFlags: string[];
  advisoryDisclaimer: string | null;
}

const RED_FLAG_KEYWORDS = [
  "severe pain",
  "fainting",
  "fainted",
  "passed out",
  "heavy bleeding",
  "hemorrhage",
  "soaking through pads",
  "clots larger than quarter",
  "dizziness",
  "vomiting constantly",
  "fever with cramps",
  "unbearable pain"
];

export function checkRedFlags(userMessage: string): RedFlagCheckResult {
  const lower = userMessage.toLowerCase();
  const detected = RED_FLAG_KEYWORDS.filter((keyword) => lower.includes(keyword));

  if (detected.length > 0) {
    return {
      hasRedFlags: true,
      detectedFlags: detected,
      advisoryDisclaimer:
        "⚠️ Important Health Advisory: The symptoms you described may require immediate medical attention. Please consult a qualified healthcare provider or visit an urgent care facility."
    };
  }

  return {
    hasRedFlags: false,
    detectedFlags: [],
    advisoryDisclaimer: null
  };
}
