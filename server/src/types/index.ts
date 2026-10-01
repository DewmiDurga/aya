export interface Profile {
  id: string;
  date_of_birth: string | null;
  height_cm: number | null;
  weight_kg: number | null;
  menarche_date: string | null;
  is_on_contraception: boolean;
  has_pcos: boolean | null;
  has_thyroid_condition: boolean | null;
  cycle_type: "regular" | "irregular" | "unknown";
  created_at: string;
}

export interface PeriodLog {
  id: string;
  user_id: string;
  start_date: string;
  end_date: string | null;
  flow_intensity: "light" | "medium" | "heavy" | null;
  created_at: string;
}

export interface DailyLog {
  id: string;
  user_id: string;
  log_date: string;
  mood: string | null;
  symptoms: string[];
  notes: string | null;
}

export type Confidence = "high" | "medium" | "low";

export interface CyclePrediction {
  user_id: string;
  predicted_start: string;
  predicted_range_low: string;
  predicted_range_high: string;
  confidence: Confidence;
  avg_cycle_length: number;
  std_dev: number;
  updated_at: string;
}

export interface AuthenticatedRequestUser {
  id: string;
  email?: string;
}
