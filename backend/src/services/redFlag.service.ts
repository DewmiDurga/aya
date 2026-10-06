export interface RedFlagCheckResult {
  hasRedFlags: boolean;
  detectedFlags: string[];
  advisoryDisclaimer: string | null;
}

const RED_FLAG_KEYWORDS = [
  // Severe pain & neurological symptoms
  "severe pain",
  "unbearable pain",
  "excruciating pain",
  "agonizing pain",
  "extreme pelvic pain",
  "sudden sharp pain",
  "sharp stabbing pain",
  "unable to stand from pain",
  "unable to walk from pain",
  "fainting",
  "fainted",
  "passed out",
  "loss of consciousness",
  "dizziness",
  "dizzy and lightheaded",
  "feeling faint",
  "vomiting constantly",
  "persistent vomiting",

  // Heavy / prolonged bleeding
  "heavy bleeding",
  "hemorrhage",
  "hemorrhaging",
  "soaking through pads",
  "soaking through a pad",
  "soaking a pad every hour",
  "soaking a pad an hour",
  "soaking through tampons",
  "soaking a tampon every hour",
  "clots larger than quarter",
  "clots bigger than a quarter",
  "large blood clots",
  "passing large clots",
  "bleeding for more than 7 days",
  "bleeding for more than 10 days",
  "bleeding for over a week",
  "bleeding non-stop",
  "bleeding constantly",
  "continuous bleeding",
  "bleeding profusely",

  // Prolonged absence of periods / amenorrhea
  "prolonged absence of periods",
  "prolonged absence of period",
  "absence of period",
  "absence of menstruation",
  "missed period for",
  "missed my period for",
  "no period for",
  "haven't had my period",
  "havent had my period",
  "haven't had a period",
  "havent had a period",
  "no period in months",
  "no period for months",
  "amenorrhea",
  "period stopped",
  "stopped getting my period",
  "haven't bled in months",
  "havent bled in months",
  "period is 3 months late",
  "period is late by months",

  // Infection & systemic signs
  "fever with cramps",
  "high fever with pain",
  "fever and chills",
  "foul-smelling discharge",
  "foul smelling discharge",
  "smelly vaginal discharge",
  "toxic shock",

  // Pregnancy emergencies
  "positive pregnancy test and severe pain",
  "ectopic pregnancy",
  "bleeding while pregnant",
  "pregnant and bleeding"
];

const PROLONGED_ABSENCE_PATTERNS = [
  /(?:no|missed|haven'?t had(?: my)?)\s+period\s+(?:for|in)\s+\d+\s*(?:months?|weeks?|days?)/i,
  /(?:no|missed)\s+period\s+(?:for|in)\s+(?:two|three|four|\d+)\s+months?/i,
  /(?:haven'?t|havent)\s+(?:had(?: my)?\s+period|bled)\s+(?:in|for)\s+\d+\s*(?:months?|days?)/i,
  /(?:no\s+bleeding|no\s+menses)\s+(?:for|in)\s+\d+\s*(?:months?|days?)/i
];

export function checkRedFlags(userMessage: string): RedFlagCheckResult {
  const lower = userMessage.toLowerCase();
  const detected: string[] = [];

  // Match keyword phrases
  for (const keyword of RED_FLAG_KEYWORDS) {
    if (lower.includes(keyword)) {
      detected.push(keyword);
    }
  }

  // Match prolonged absence patterns
  for (const pattern of PROLONGED_ABSENCE_PATTERNS) {
    const match = userMessage.match(pattern);
    if (match && !detected.includes(match[0].toLowerCase())) {
      detected.push(match[0].toLowerCase());
    }
  }

  if (detected.length > 0) {
    return {
      hasRedFlags: true,
      detectedFlags: detected,
      advisoryDisclaimer:
        "⚠️ Important Health Advisory: The symptoms you described may require medical evaluation. Please consult a qualified doctor or healthcare professional."
    };
  }

  return {
    hasRedFlags: false,
    detectedFlags: [],
    advisoryDisclaimer: null
  };
}

