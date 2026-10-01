import { Response } from "express";
import { supabaseAdmin } from "../config/supabase";
import { AuthedRequest } from "../middleware/authMiddleware";

export async function upsertDailyLog(req: AuthedRequest, res: Response): Promise<void> {
  const { data, error } = await supabaseAdmin
    .from("daily_logs")
    .upsert(
      { ...req.body, user_id: req.user!.id },
      { onConflict: "user_id,log_date" }
    )
    .select()
    .single();

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }
  res.status(200).json(data);
}

export async function listDailyLogs(req: AuthedRequest, res: Response): Promise<void> {
  const { from, to } = req.query;

  let query = supabaseAdmin
    .from("daily_logs")
    .select("*")
    .eq("user_id", req.user!.id)
    .order("log_date", { ascending: true });

  if (from) query = query.gte("log_date", String(from));
  if (to) query = query.lte("log_date", String(to));

  const { data, error } = await query;

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }
  res.json(data);
}
