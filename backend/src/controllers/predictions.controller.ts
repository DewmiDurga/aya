import { Response } from "express";
import { AuthenticatedRequest } from "../types";
import { supabaseAdmin, isSupabaseConfigured } from "../config/supabase";
import { predictNextPeriod } from "../services/prediction.service";
import { periodStore } from "./periods.controller";

export async function getPredictions(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  const userId = req.user?.id || "demo-user-id";

  try {
    let periods: any[] | null = null;

    if (isSupabaseConfigured) {
      const { data, error } = await supabaseAdmin
        .from("period_logs")
        .select("start_date")
        .eq("user_id", userId)
        .order("start_date", { ascending: false })
        .limit(6);

      if (!error && data) {
        periods = data;
      }
    }

    let startDates: string[] = [];

    if (periods && periods.length > 0) {
      startDates = periods.map((p) => p.start_date);
    } else {
      // Check in-memory store
      const inMem = periodStore.get(userId);
      if (inMem && inMem.length > 0) {
        startDates = inMem.map((p) => p.start_date);
      } else {
        startDates = ["2026-07-01", "2026-07-29", "2026-08-27", "2026-09-25"]; // demo fallback
      }
    }

    const prediction = predictNextPeriod(startDates);

    if (!prediction) {
      res.json({
        available: false,
        message: "Log at least 2 period start dates to calculate accurate cycle predictions."
      });
      return;
    }

    res.json({
      available: true,
      ...prediction
    });
  } catch (err: any) {
    res.status(500).json({ error: "Prediction calculation error", message: err.message });
  }
}
