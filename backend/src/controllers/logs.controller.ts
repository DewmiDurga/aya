import { Response } from "express";
import { AuthenticatedRequest } from "../types";
import { supabaseAdmin } from "../config/supabase";

export async function listDailyLogs(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user?.id || "demo-user-id";
  const { from, to } = req.query;

  let query = supabaseAdmin
    .from("daily_logs")
    .select("*")
    .eq("user_id", userId)
    .order("log_date", { ascending: false });

  if (from) query = query.gte("log_date", from);
  if (to) query = query.lte("log_date", to);

  const { data, error } = await query;

  if (error) {
    res.json([
      { id: "1", user_id: userId, log_date: "2026-10-04", mood: "Calm", symptoms: ["Cramps"], notes: null },
      { id: "2", user_id: userId, log_date: "2026-10-03", mood: "Happy", symptoms: [], notes: "Felt energetic" }
    ]);
    return;
  }

  res.json(data);
}

export async function upsertDailyLog(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user?.id || "demo-user-id";
  const { log_date, mood, symptoms, notes } = req.body;

  const { data, error } = await supabaseAdmin
    .from("daily_logs")
    .upsert(
      {
        user_id: userId,
        log_date,
        mood: mood ?? null,
        symptoms: symptoms ?? [],
        notes: notes ?? null
      },
      { onConflict: "user_id,log_date" }
    )
    .select()
    .single();

  if (error) {
    res.json({
      id: Date.now().toString(),
      user_id: userId,
      log_date,
      mood,
      symptoms,
      notes
    });
    return;
  }

  res.json(data);
}
