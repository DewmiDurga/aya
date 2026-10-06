import { Response } from "express";
import { AuthenticatedRequest } from "../types";
import { supabaseAdmin, isSupabaseConfigured } from "../config/supabase";

// In-memory store for dev/testing fallback when Supabase is offline
// Keyed by `${userId}:${log_date}` to strictly enforce upsert uniqueness
export const dailyLogStore = new Map<string, any>();

export async function listDailyLogs(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user?.id || "demo-user-id";
  const { from, to } = req.query;

  if (isSupabaseConfigured) {
    try {
      let query = supabaseAdmin
        .from("daily_logs")
        .select("*")
        .eq("user_id", userId)
        .order("log_date", { ascending: false });

      if (from) query = query.gte("log_date", from);
      if (to) query = query.lte("log_date", to);

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        res.json(data);
        return;
      }
    } catch (e) {
      // Supabase error fallback
    }
  }

  // Filter in-memory logs for this user
  let userLogs: any[] = [];
  for (const [key, val] of dailyLogStore.entries()) {
    if (key.startsWith(`${userId}:`)) {
      userLogs.push(val);
    }
  }

  if (userLogs.length === 0) {
    userLogs = [
      { id: "1", user_id: userId, log_date: "2026-10-04", mood: "Calm", symptoms: ["Cramps"], notes: null },
      { id: "2", user_id: userId, log_date: "2026-10-03", mood: "Happy", symptoms: [], notes: "Felt energetic" }
    ];
  }

  userLogs.sort((a, b) => new Date(b.log_date).getTime() - new Date(a.log_date).getTime());

  if (from) {
    userLogs = userLogs.filter((l) => l.log_date >= (from as string));
  }
  if (to) {
    userLogs = userLogs.filter((l) => l.log_date <= (to as string));
  }

  res.json(userLogs);
}

export async function upsertDailyLog(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user?.id || "demo-user-id";
  const { log_date, mood, symptoms, notes } = req.body;
  const storeKey = `${userId}:${log_date}`;

  if (isSupabaseConfigured) {
    try {
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

      if (!error && data) {
        dailyLogStore.set(storeKey, data);
        res.json(data);
        return;
      }
    } catch (e) {
      // Supabase error fallback
    }
  }

  const existing = dailyLogStore.get(storeKey);
  const logEntry = {
    id: existing?.id || `log-${Date.now()}`,
    user_id: userId,
    log_date,
    mood: mood ?? null,
    symptoms: symptoms ?? [],
    notes: notes ?? null,
    updated_at: new Date().toISOString()
  };

  dailyLogStore.set(storeKey, logEntry);
  res.json(logEntry);
}
