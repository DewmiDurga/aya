import { Response } from "express";
import { AuthenticatedRequest } from "../types";
import { supabaseAdmin, isSupabaseConfigured } from "../config/supabase";

// In-memory store for dev/testing fallback when Supabase is offline
const profileStore = new Map<string, any>();

export async function getProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user?.id || "demo-user-id";

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabaseAdmin
        .from("profiles")
        .select("*")
        .or(`id.eq.${userId},user_id.eq.${userId}`)
        .maybeSingle();

      if (!error && data) {
        res.json(data);
        return;
      }
    } catch (e) {
      // Supabase error fallback
    }
  }

  const stored = profileStore.get(userId) || {
    id: userId,
    user_id: userId,
    display_name: "Ayomi",
    average_cycle_length: 28,
    average_period_duration: 5,
    is_cycle_regular: true
  };

  res.json(stored);
}

export async function updateProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user?.id || "demo-user-id";
  const updates = req.body;

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabaseAdmin
        .from("profiles")
        .upsert(
          {
            id: userId,
            user_id: userId,
            ...updates,
            updated_at: new Date().toISOString()
          },
          { onConflict: "id" }
        )
        .select()
        .maybeSingle();

      if (!error && data) {
        profileStore.set(userId, data);
        res.json(data);
        return;
      }
    } catch (e) {
      // Supabase error fallback
    }
  }

  const existing = profileStore.get(userId) || {
    id: userId,
    user_id: userId,
    display_name: "Ayomi",
    average_cycle_length: 28,
    average_period_duration: 5,
    is_cycle_regular: true
  };

  const updated = {
    ...existing,
    ...updates,
    updated_at: new Date().toISOString()
  };

  profileStore.set(userId, updated);
  res.json(updated);
}

