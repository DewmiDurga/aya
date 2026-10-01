import Anthropic from "@anthropic-ai/sdk";
import { env } from "../config/env";
import { PeriodLog, DailyLog, Profile } from "../types";
import { checkForRedFlags, RED_FLAG_DISCLAIMER } from "./redFlag.service";

const anthropic = new Anthropic({ apiKey: env.anthropicApiKey });

const SYSTEM_PROMPT = `You are a supportive, knowledgeable menstrual health assistant inside
the "Eya" period tracking app, built for users in Sri Lanka.

Rules you must always follow:
- You are an information and education tool, NOT a diagnostic tool. Never diagnose conditions
  (e.g. PCOS, endometriosis, thyroid issues) — you may explain what they are if asked.
- If the user describes symptoms that could indicate something serious (very heavy bleeding,
  missed periods for 3+ months, severe pain, fainting), gently but clearly recommend seeing
  a doctor or gynecologist.
- Keep answers warm, clear, and non-judgmental. Avoid clinical jargon unless asked.
- Personalize answers using the user's own cycle data when it's provided in context, but never
  assume something not in the data.
- Do not recommend specific medications or dosages.`;

interface ChatContext {
  profile: Partial<Profile> | null;
  recentPeriods: Pick<PeriodLog, "start_date" | "end_date" | "flow_intensity">[];
  recentDailyLogs: Pick<DailyLog, "log_date" | "mood" | "symptoms">[];
}

export async function getChatbotReply(
  userMessage: string,
  context: ChatContext
): Promise<{ reply: string; wasRedFlagged: boolean }> {
  const redFlagCheck = checkForRedFlags(userMessage);

  const contextBlock = `
User profile (partial): ${JSON.stringify(context.profile)}
Recent period logs: ${JSON.stringify(context.recentPeriods)}
Recent daily logs (mood/symptoms): ${JSON.stringify(context.recentDailyLogs)}
`.trim();

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 600,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Context about this user:\n${contextBlock}\n\nUser's message: ${userMessage}`
      }
    ]
  });

  const textBlock = response.content.find((block) => block.type === "text");
  let reply = textBlock && "text" in textBlock ? textBlock.text : "";

  if (redFlagCheck.flagged) {
    reply = `${reply}\n\n${RED_FLAG_DISCLAIMER}`;
  }

  return { reply, wasRedFlagged: redFlagCheck.flagged };
}
