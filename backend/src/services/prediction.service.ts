import { addDays, daysBetween, mean, stdDev } from "../utils/dateMath";
import { PredictionResult, Confidence, CycleType } from "../types";

const MIN_PERIODS_FOR_PREDICTION = 2;
const RECENT_WEIGHT_WINDOW = 3;

/**
 * Predicts the next menstrual cycle start date and confidence window.
 * - Uses intervals between consecutive period start dates
 * - Applies weighted moving average giving higher weight to recent cycles
 * - Uses standard deviation variance to classify regularity and confidence
 */
export function predictNextPeriod(periodStartDates: string[]): PredictionResult | null {
  if (periodStartDates.length < MIN_PERIODS_FOR_PREDICTION) {
    return null;
  }

  // Sort dates chronologically (oldest to newest)
  const sorted = [...periodStartDates].sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  // Compute gaps (cycle lengths in days)
  const gaps: number[] = [];
  for (let i = 1; i < sorted.length; i++) {
    const gap = daysBetween(sorted[i - 1], sorted[i]);
    if (gap >= 10 && gap <= 100) {
      gaps.push(gap);
    }
  }

  if (gaps.length === 0) {
    return null;
  }

  // Weight recent cycles more heavily
  const weightedGaps = gaps.map((gap, idx) => {
    const isRecent = idx >= gaps.length - RECENT_WEIGHT_WINDOW;
    return { gap, weight: isRecent ? 2 : 1 };
  });

  const totalWeight = weightedGaps.reduce((sum, item) => sum + item.weight, 0);
  const weightedAverage =
    weightedGaps.reduce((sum, item) => sum + item.gap * item.weight, 0) / totalWeight;

  const deviation = gaps.length > 1 ? stdDev(gaps) : 2.5;
  const lastPeriodDate = sorted[sorted.length - 1];

  const predictedStartDate = addDays(lastPeriodDate, Math.round(weightedAverage));

  let confidence: Confidence = "medium";
  let cycleType: CycleType = "unknown";

  if (gaps.length < 3) {
    confidence = "low";
    cycleType = "unknown";
  } else if (deviation <= 3.0) {
    confidence = "high";
    cycleType = "regular";
  } else if (deviation <= 6.0) {
    confidence = "medium";
    cycleType = "regular";
  } else {
    confidence = "low";
    cycleType = "irregular";
  }

  const marginDays = Math.max(2, Math.round(deviation));
  const rangeLow = addDays(predictedStartDate, -marginDays);
  const rangeHigh = addDays(predictedStartDate, marginDays);

  return {
    predictedStart: predictedStartDate,
    rangeLow,
    rangeHigh,
    confidence,
    avgCycleLength: Math.round(weightedAverage * 10) / 10,
    stdDevDays: Math.round(deviation * 10) / 10,
    cycleType
  };
}
