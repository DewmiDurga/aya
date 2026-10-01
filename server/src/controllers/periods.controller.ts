import { Response } from "express";
import { supabaseAdmin } from "../config/supabase";
import { AuthedRequest } from "../middleware/authMiddleware";

export async function createPeriodLog(req: AuthedRequest, res: Response): Promise<void> {
  const { data, error } = await supabaseAdmin
    .from("period_logs")
    .insert({ ...req.body, user_id: req.user!.id })
    .select()
    .single();

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }
  res.status(201).json(data);
}

export async function listPeriodLogs(req: AuthedRequest, res: Response): Promise<void> {
  const limit = Number(req.query.limit) || 12;

  const { data, error } = await supabaseAdmin
    .from("period_logs")
    .select("*")
    .eq("user_id", req.user!.id)
    .order("start_date", { ascending: false })
    .limit(limit);

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }
  res.json(data);
}

export async function deletePeriodLog(req: AuthedRequest, res: Response): Promise<void> {
  const { id } = req.params;
  const { error } = await supabaseAdmin
    .from("period_logs")
    .delete()
    .eq("id", id)
    .eq("user_id", req.user!.id);

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }
  res.status(204).send();
}
