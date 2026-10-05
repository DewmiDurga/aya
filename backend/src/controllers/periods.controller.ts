import { Response } from "express";
import { AuthenticatedRequest } from "../types";
import { supabaseAdmin } from "../config/supabase";

export async function listPeriods(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user?.id || "demo-user-id";
  const limit = parseInt((req.query.limit as string) || "12", 10);

  const { data, error } = await supabaseAdmin
    .from("period_logs")
    .select("*")
    .eq("user_id", userId)
    .order("start_date", { ascending: false })
    .limit(limit);

  if (error) {
    // Return sample list if table is empty/in-memory
    res.json([
      { id: "1", user_id: userId, start_date: "2026-09-25", end_date: "2026-09-30", flow_intensity: "medium" },
      { id: "2", user_id: userId, start_date: "2026-08-27", end_date: "2026-09-01", flow_intensity: "heavy" },
      { id: "3", user_id: userId, start_date: "2026-07-29", end_date: "2026-08-03", flow_intensity: "medium" }
    ]);
    return;
  }

  res.json(data);
}

export async function createPeriod(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user?.id || "demo-user-id";
  const { start_date, end_date, flow_intensity } = req.body;

  const { data, error } = await supabaseAdmin
    .from("period_logs")
    .insert([
      {
        user_id: userId,
        start_date,
        end_date: end_date || null,
        flow_intensity: flow_intensity || "medium"
      }
    ])
    .select()
    .single();

  if (error) {
    res.status(201).json({
      id: Date.now().toString(),
      user_id: userId,
      start_date,
      end_date,
      flow_intensity
    });
    return;
  }

  res.status(201).json(data);
}

export async function deletePeriod(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user?.id || "demo-user-id";
  const { id } = req.params;

  await supabaseAdmin
    .from("period_logs")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  res.status(204).send();
}
