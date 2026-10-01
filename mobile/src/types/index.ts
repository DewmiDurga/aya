export type Confidence = "high" | "medium" | "low";

export interface PredictionResult {
  available: boolean;
  predictedStart?: string;
  rangeLow?: string;
  rangeHigh?: string;
  confidence?: Confidence;
  avgCycleLength?: number;
  stdDevDays?: number;
  cycleType?: "regular" | "irregular" | "unknown";
  message?: string;
}

export interface PeriodLog {
  id: string;
  start_date: string;
  end_date: string | null;
  flow_intensity: "light" | "medium" | "heavy" | null;
}

export interface DailyLog {
  id: string;
  log_date: string;
  mood: string | null;
  symptoms: string[];
  notes: string | null;
}
