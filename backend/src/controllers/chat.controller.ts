import { Response } from "express";
import { AuthenticatedRequest } from "../types";
import { supabaseAdmin } from "../config/supabase";
import { askClaudeChatbot, ChatContext } from "../services/claude.service";
import { daysBetween } from "../utils/dateMath";

export async function handleChatMessage(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  const userId = req.user?.id || "demo-user-id";
  const { message } = req.body;

  try {
    // 1. Fetch user profile for context
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("average_cycle_length")
      .eq("user_id", userId)
      .maybeSingle();

    // 2. Fetch last period date
    const { data: lastPeriod } = await supabaseAdmin
      .from("period_logs")
      .select("start_date")
      .eq("user_id", userId)
      .order("start_date", { ascending: false })
      .limit(1)
      .maybeSingle();

    // 3. Fetch recent symptoms
    const { data: recentLogs } = await supabaseAdmin
      .from("daily_logs")
      .select("symptoms")
      .eq("user_id", userId)
      .order("log_date", { ascending: false })
      .limit(5);

    const symptomsSet = new Set<string>();
    recentLogs?.forEach((l) => l.symptoms?.forEach((s: string) => symptomsSet.add(s)));

    const todayStr = new Date().toISOString().split("T")[0];
    let cycleDay: number | undefined;
    if (lastPeriod?.start_date) {
      cycleDay = daysBetween(lastPeriod.start_date, todayStr) + 1;
    }

    const context: ChatContext = {
      cycleDay: cycleDay || 14,
      lastPeriodStart: lastPeriod?.start_date || "2026-09-25",
      recentSymptoms: Array.from(symptomsSet),
      averageCycleLength: profile?.average_cycle_length || 28
    };

    const result = await askClaudeChatbot(message, context);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: "Chat service error", message: err.message });
  }
}
