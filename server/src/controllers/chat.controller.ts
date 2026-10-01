import { Response } from "express";
import { supabaseAdmin } from "../config/supabase";
import { AuthedRequest } from "../middleware/authMiddleware";
import { getChatbotReply } from "../services/claude.service";

export async function sendChatMessage(req: AuthedRequest, res: Response): Promise<void> {
  const { message } = req.body;
  const userId = req.user!.id;

  const [{ data: profile }, { data: recentPeriods }, { data: recentDailyLogs }] =
    await Promise.all([
      supabaseAdmin
        .from("profiles")
        .select("cycle_type, is_on_contraception, has_pcos, has_thyroid_condition")
        .eq("id", userId)
        .single(),
      supabaseAdmin
        .from("period_logs")
        .select("start_date, end_date, flow_intensity")
        .eq("user_id", userId)
        .order("start_date", { ascending: false })
        .limit(5),
      supabaseAdmin
        .from("daily_logs")
        .select("log_date, mood, symptoms")
        .eq("user_id", userId)
        .order("log_date", { ascending: false })
        .limit(14)
    ]);

  const { reply, wasRedFlagged } = await getChatbotReply(message, {
    profile: profile ?? null,
    recentPeriods: recentPeriods ?? [],
    recentDailyLogs: recentDailyLogs ?? []
  });

  res.json({ reply, wasRedFlagged });
}
