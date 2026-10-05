export type WebTab = "dashboard" | "calendar" | "log" | "insights" | "chat";

export type MoodType = "Bright" | "Good" | "Steady" | "Low" | "Tearful";

export type FlowType = "None" | "Spotting" | "Light" | "Medium" | "Heavy";

export interface DailyLogState {
  date: string;
  dayName: string;
  mood: MoodType;
  flow: FlowType;
  symptoms: string[];
  energy: number;
  note: string;
}

export interface CycleStats {
  currentDay: number;
  totalDays: number;
  phase: string;
  nextPeriodDate: string;
  daysUntilPeriod: number;
  fertileWindow: string;
  avgCycleLength: number;
  avgPeriodLength: number;
  cycleVariation: number;
}
