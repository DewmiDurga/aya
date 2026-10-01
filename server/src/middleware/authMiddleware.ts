import { Request, Response, NextFunction } from "express";
import { supabaseAdmin } from "../config/supabase";
import { AuthenticatedRequestUser } from "../types";

export interface AuthedRequest extends Request {
  user?: AuthenticatedRequestUser;
}

// Verifies the Supabase JWT sent from the mobile app in the Authorization header.
export async function authMiddleware(
  req: AuthedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing or malformed Authorization header" });
    return;
  }

  const token = authHeader.replace("Bearer ", "");
  const { data, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !data.user) {
    res.status(401).json({ error: "Invalid or expired token" });
    return;
  }

  req.user = { id: data.user.id, email: data.user.email };
  next();
}
