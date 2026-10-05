import { Request } from "express";

export type Confidence = "high" | "medium" | "low";
export type CycleType = "regular" | "irregular" | "unknown";
export type FlowIntensity = "light" | "medium" | "heavy" | "spotting";

export interface AuthenticatedUser {
  id: string;
  email?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

export interface PeriodLog {
  id: string;
  user_id: string;
  start_date: string;
  end_date: string | null;
  flow_intensity: FlowIntensity;
  created_at: string;
}

export interface DailyLog {
  id: string;
  user_id: string;
  log_date: string;
  mood: string | null;
  symptoms: string[];
  notes: string | null;
  created_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  display_name: string | null;
  average_cycle_length: number;
  average_period_duration: number;
  is_cycle_regular: boolean;
  created_at: string;
  updated_at: string;
}

export interface PredictionResult {
  predictedStart: string;
  rangeLow: string;
  rangeHigh: string;
  confidence: Confidence;
  avgCycleLength: number;
  stdDevDays: number;
  cycleType: CycleType;
}
