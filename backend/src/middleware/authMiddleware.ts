import { Response, NextFunction } from "express";
import { supabaseAdmin } from "../config/supabase";
import { AuthenticatedRequest } from "../types";

export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // If running in development without strict Supabase auth, allow demo user
    if (process.env.NODE_ENV === "development" || !process.env.SUPABASE_URL) {
      req.user = { id: "demo-user-id", email: "demo@eya.health" };
      return next();
    }
    res.status(401).json({ error: "Unauthorized: Missing or invalid Bearer token" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !data.user) {
      res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
      return;
    }

    req.user = { id: data.user.id, email: data.user.email };
    next();
  } catch (err: any) {
    res.status(500).json({ error: "Auth verification failure", message: err.message });
  }
}
