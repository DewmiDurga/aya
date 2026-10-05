export type TabType = "today" | "calendar" | "log" | "insights";

export type MoodType = "Bright" | "Good" | "Steady" | "Low" | "Tearful";

export type FlowType = "None" | "Spotting" | "Light" | "Medium" | "Heavy";

export interface DailyLogState {
  date: string; // e.g. "2026-10-05"
  dayName: string; // e.g. "Monday, October 5"
  mood: MoodType;
  flow: FlowType;
  symptoms: string[];
  energy: number; // 1 to 5
  note: string;
}

export interface CycleSummary {
  cycleDay: number;
  totalCycleDays: number;
  phase: string;
  nextPeriodDate: string;
  daysUntilPeriod: number;
  fertileWindow: string;
  averageCycleLength: number;
  averagePeriodLength: number;
  variationDays: number;
}
