import { Response } from "express";
import { AuthenticatedRequest } from "../types";
import { supabaseAdmin } from "../config/supabase";

export async function getProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user?.id || "demo-user-id";

  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) {
    res.json({
      id: "demo-profile-id",
      user_id: userId,
      display_name: "Ayomi",
      average_cycle_length: 28,
      average_period_duration: 5,
      is_cycle_regular: true
    });
    return;
  }

  res.json(data);
}

export async function updateProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user?.id || "demo-user-id";
  const updates = req.body;

  const { data, error } = await supabaseAdmin
    .from("profiles")
    .upsert(
      {
        user_id: userId,
        ...updates,
        updated_at: new Date().toISOString()
      },
      { onConflict: "user_id" }
    )
    .select()
    .single();

  if (error) {
    res.json({
      user_id: userId,
      ...updates
    });
    return;
  }

  res.json(data);
}
