import { Response } from "express";
import { supabaseAdmin } from "../config/supabase";
import { AuthedRequest } from "../middleware/authMiddleware";
import { predictNextPeriod } from "../services/prediction.service";

export async function getPrediction(req: AuthedRequest, res: Response): Promise<void> {
  const { data: periods, error } = await supabaseAdmin
    .from("period_logs")
    .select("start_date")
    .eq("user_id", req.user!.id)
    .order("start_date", { ascending: true })
    .limit(6);

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  const startDates = (periods ?? []).map((p) => p.start_date as string);
  const prediction = predictNextPeriod(startDates);

  if (!prediction) {
    res.status(200).json({
      available: false,
      message: "Not enough period history yet — log at least 2 periods to get a prediction."
    });
    return;
  }

  // Cache the prediction so the app doesn't have to recompute on every load
  await supabaseAdmin.from("cycle_predictions").upsert({
    user_id: req.user!.id,
    predicted_start: prediction.predictedStart,
    predicted_range_low: prediction.rangeLow,
    predicted_range_high: prediction.rangeHigh,
    confidence: prediction.confidence,
    avg_cycle_length: prediction.avgCycleLength,
    std_dev: prediction.stdDevDays,
    updated_at: new Date().toISOString()
  });

  res.json({ available: true, ...prediction });
}
