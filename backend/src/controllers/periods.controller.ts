import { Response } from "express";
import { AuthenticatedRequest } from "../types";
import { supabaseAdmin, isSupabaseConfigured } from "../config/supabase";

// In-memory store for dev/testing fallback when Supabase is offline
export const periodStore = new Map<string, any[]>();

export async function listPeriods(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user?.id || "demo-user-id";
  const limit = parseInt((req.query.limit as string) || "12", 10);

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabaseAdmin
        .from("period_logs")
        .select("*")
        .eq("user_id", userId)
        .order("start_date", { ascending: false })
        .limit(limit);

      if (!error && data && data.length > 0) {
        res.json(data);
        return;
      }
    } catch (e) {
      // Supabase error fallback
    }
  }

  const stored = periodStore.get(userId) || [
    { id: "1", user_id: userId, start_date: "2026-09-25", end_date: "2026-09-30", flow_intensity: "medium" },
    { id: "2", user_id: userId, start_date: "2026-08-27", end_date: "2026-09-01", flow_intensity: "heavy" },
    { id: "3", user_id: userId, start_date: "2026-07-29", end_date: "2026-08-03", flow_intensity: "medium" }
  ];

  res.json(stored.slice(0, limit));
}

export async function createPeriod(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user?.id || "demo-user-id";
  const { start_date, end_date, flow_intensity } = req.body;

  if (isSupabaseConfigured) {
    try {
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

      if (!error && data) {
        const userList = periodStore.get(userId) || [];
        userList.unshift(data);
        periodStore.set(userId, userList);
        res.status(201).json(data);
        return;
      }
    } catch (e) {
      // Supabase error fallback
    }
  }

  const newPeriod = {
    id: `log-${Date.now()}`,
    user_id: userId,
    start_date,
    end_date: end_date || null,
    flow_intensity: flow_intensity || "medium",
    created_at: new Date().toISOString()
  };

  const userList = periodStore.get(userId) || [];
  // Insert in reverse chronological order
  userList.unshift(newPeriod);
  userList.sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
  periodStore.set(userId, userList);

  res.status(201).json(newPeriod);
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
