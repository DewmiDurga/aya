import Anthropic from "@anthropic-ai/sdk";
import { ENV } from "../config/env";
import { checkRedFlags } from "./redFlag.service";

let anthropicClient: Anthropic | null = null;
if (ENV.ANTHROPIC_API_KEY) {
  anthropicClient = new Anthropic({ apiKey: ENV.ANTHROPIC_API_KEY });
}

export interface ChatContext {
  cycleDay?: number;
  lastPeriodStart?: string;
  recentSymptoms?: string[];
  averageCycleLength?: number;
}

export async function askClaudeChatbot(
  userMessage: string,
  context?: ChatContext
): Promise<{ reply: string; wasRedFlagged: boolean; disclaimer: string | null }> {
  const redFlagCheck = checkRedFlags(userMessage);

  const systemPrompt = `You are "ඇය (Eya)", an empathetic, culturally sensitive reproductive and menstrual health assistant designed for women.
Your guidelines:
1. Provide accurate, evidence-based reproductive wellness information.
2. YOU ARE NOT A DOCTOR AND NEVER PROVIDE A MEDICAL DIAGNOSIS. Always advise consulting a physician for medical conditions.
3. Be warm, supportive, respectful, and non-judgmental.
${
  context?.cycleDay
    ? `User Context: The user is currently on Cycle Day ${context.cycleDay} of their menstrual cycle (average cycle length: ${context.averageCycleLength || 28} days).`
    : ""
}
${
  context?.recentSymptoms && context.recentSymptoms.length > 0
    ? `Recent logged symptoms: ${context.recentSymptoms.join(", ")}.`
    : ""
}
Keep answers concise, clear, and reassuring.`;

  if (!anthropicClient) {
    // Graceful offline mock response when API key is not yet set
    const mockReply = `Hello! I am ඇය (Eya), your health companion. Based on your cycle records, remember to stay hydrated, maintain light physical activity, and track any unusual patterns. (Note: Running in local demonstration mode. Add ANTHROPIC_API_KEY to activate live Claude 3.5 responses).`;
    return {
      reply: mockReply,
      wasRedFlagged: redFlagCheck.hasRedFlags,
      disclaimer: redFlagCheck.advisoryDisclaimer
    };
  }

  try {
    const response = await anthropicClient.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 600,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }]
    });

    const textContent =
      response.content[0].type === "text" ? response.content[0].text : "";

    return {
      reply: textContent,
      wasRedFlagged: redFlagCheck.hasRedFlags,
      disclaimer: redFlagCheck.advisoryDisclaimer
    };
  } catch (error: any) {
    console.error("Error communicating with Claude API:", error.message);
    return {
      reply:
        "I am currently unable to process your request. Please check your internet connection or try again shortly.",
      wasRedFlagged: redFlagCheck.hasRedFlags,
      disclaimer: redFlagCheck.advisoryDisclaimer
    };
  }
}
