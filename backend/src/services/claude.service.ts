import Anthropic from "@anthropic-ai/sdk";
import { ENV } from "../config/env";
import { checkRedFlags } from "./redFlag.service";

let anthropicClient: Anthropic | null = null;
const isDummyKey = !ENV.ANTHROPIC_API_KEY || 
  ENV.ANTHROPIC_API_KEY.includes("dummy") || 
  ENV.ANTHROPIC_API_KEY.includes("your-");

if (!isDummyKey) {
  anthropicClient = new Anthropic({ apiKey: ENV.ANTHROPIC_API_KEY });
}

export interface ChatContext {
  cycleDay?: number;
  lastPeriodStart?: string;
  recentSymptoms?: string[];
  averageCycleLength?: number;
}

function generateEducationalResponse(
  userMessage: string,
  context?: ChatContext,
  redFlagCheck?: ReturnType<typeof checkRedFlags>
): string {
  const lower = userMessage.toLowerCase();

  if (redFlagCheck?.hasRedFlags) {
    if (
      lower.includes("no period") ||
      lower.includes("missed") ||
      lower.includes("amenorrhea") ||
      lower.includes("haven't had") ||
      lower.includes("havent had")
    ) {
      return (
        "A prolonged absence of menstrual periods (amenorrhea) can be associated with hormonal imbalances, PCOS, thyroid conditions, or other physiological changes. " +
        "Because missing periods for an extended duration warrants clinical investigation, we strongly recommend consulting a qualified doctor or gynecologist for a comprehensive evaluation."
      );
    }
    if (lower.includes("bleed") || lower.includes("soak") || lower.includes("clot")) {
      return (
        "Experiencing unusually heavy bleeding, soaking through pads rapidly, or passing large blood clots can lead to significant blood loss. " +
        "Please seek a medical evaluation from a physician to investigate potential causes such as fibroids or hormonal fluctuations."
      );
    }
    return (
      "The symptoms you have described may indicate an acute health concern. " +
      "We strongly advise consulting a qualified healthcare professional or physician for personalized medical advice."
    );
  }

  if (lower.includes("cramp") || lower.includes("pain")) {
    return (
      "Mild cramps are commonly caused by uterine contractions stimulated by prostaglandins during your cycle. " +
      "Helpful non-medical comfort measures include applying a warm compress, staying well hydrated, and gentle stretching. " +
      "If pain ever becomes unbearable or impedes daily activities, consider discussing it with your doctor."
    );
  }

  if (lower.includes("food") || lower.includes("eat") || lower.includes("diet") || lower.includes("nutrition")) {
    return (
      "Nutritional needs subtly shift throughout your cycle. During menstruation and the follicular phase, iron-rich foods, vitamin C, and complex carbohydrates support cellular rebuilding and energy. " +
      "In the luteal phase, magnesium-rich foods (such as pumpkin seeds and dark leafy greens) can help ease premenstrual bloating."
    );
  }

  if (lower.includes("irregular") || lower.includes("variation") || lower.includes("normal") || lower.includes("28 day")) {
    return (
      "Menstrual cycles naturally vary between 21 and 35 days, and fluctuations of 2 to 7 days from month to month are normal and frequently influenced by stress, travel, or sleep patterns. " +
      "Logging each cycle consistently helps establish your individual personal baseline."
    );
  }

  return (
    `Hello! I am ඇය (Eya), your reproductive wellness companion. ` +
    `Based on your cycle profile${context?.cycleDay ? ` (Cycle Day ${context.cycleDay})` : ""}, ` +
    `remember to track your symptoms, stay hydrated, and maintain balanced nutrition. How can I assist you with your cycle today?`
  );
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
    // Educational response with safety protocols
    const reply = generateEducationalResponse(userMessage, context, redFlagCheck);
    return {
      reply,
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
    console.warn("Live Claude API unavailable, using educational fallback:", error.message);
    const reply = generateEducationalResponse(userMessage, context, redFlagCheck);
    return {
      reply,
      wasRedFlagged: redFlagCheck.hasRedFlags,
      disclaimer: redFlagCheck.advisoryDisclaimer
    };
  }
}

