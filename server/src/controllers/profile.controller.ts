import { Response } from "express";
import { supabaseAdmin } from "../config/supabase";
import { AuthedRequest } from "../middleware/authMiddleware";

export async function getProfile(req: AuthedRequest, res: Response): Promise<void> {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("id", req.user!.id)
    .single();

  if (error) {
    res.status(404).json({ error: "Profile not found" });
    return;
  }
  res.json(data);
}

export async function updateProfile(req: AuthedRequest, res: Response): Promise<void> {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .update(req.body)
    .eq("id", req.user!.id)
    .select()
    .single();

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }
  res.json(data);
}
