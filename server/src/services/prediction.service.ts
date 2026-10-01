import { addDays, daysBetween, mean, stdDev } from "../utils/dateMath";
import { Confidence } from "../types";

export interface PredictionResult {
  predictedStart: string;
  rangeLow: string;
  rangeHigh: string;
  confidence: Confidence;
  avgCycleLength: number;
  stdDevDays: number;
  cycleType: "regular" | "irregular" | "unknown";
}

const MIN_CYCLES_FOR_PREDICTION = 2; // need at least 2 periods to get 1 gap
const RECENT_CYCLE_WEIGHT_COUNT = 3; // weight the most recent cycles more heavily

/**
 * Predicts the next period start date from a user's past period start dates.
 * - Uses gaps between consecutive period starts as "cycle lengths"
 * - Weights recent cycles more heavily than older ones
 * - Regular cycles (low variance) -> tight, high-confidence range
 * - Irregular cycles (high variance) -> wider, lower-confidence range
 *
 * @param periodStartDates sorted ascending (oldest first), ideally last 5-6 periods
 */
export function predictNextPeriod(periodStartDates: string[]): PredictionResult | null {
  if (periodStartDates.length < MIN_CYCLES_FOR_PREDICTION) {
    return null; // not enough data yet
  }

  const sorted = [...periodStartDates].sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const gaps: number[] = [];
  for (let i = 1; i < sorted.length; i++) {
    gaps.push(daysBetween(sorted[i - 1], sorted[i]));
  }

  // Weight recent cycles more heavily than older ones
  const weightedGaps = gaps.map((gap, idx) => {
    const isRecent = idx >= gaps.length - RECENT_CYCLE_WEIGHT_COUNT;
    return { gap, weight: isRecent ? 2 : 1 };
  });

  const totalWeight = weightedGaps.reduce((sum, g) => sum + g.weight, 0);
  const weightedMean =
    weightedGaps.reduce((sum, g) => sum + g.gap * g.weight, 0) / totalWeight;

  const variance = stdDev(gaps);
  const lastPeriod = sorted[sorted.length - 1];

  const predictedStart = addDays(lastPeriod, Math.round(weightedMean));

  let confidence: Confidence;
  let cycleType: "regular" | "irregular" | "unknown";

  if (gaps.length < 3) {
    confidence = "low";
    cycleType = "unknown";
  } else if (variance <= 3) {
    confidence = "high";
    cycleType = "regular";
  } else if (variance <= 7) {
    confidence = "medium";
    cycleType = "regular";
  } else {
    confidence = "low";
    cycleType = "irregular";
  }

  // Range widens with uncertainty; minimum 2-day buffer even for tight cycles
  const rangeBuffer = Math.max(2, Math.round(variance));

  return {
    predictedStart,
    rangeLow: addDays(predictedStart, -rangeBuffer),
    rangeHigh: addDays(predictedStart, rangeBuffer),
    confidence,
    avgCycleLength: Math.round(weightedMean * 10) / 10,
    stdDevDays: Math.round(variance * 10) / 10,
    cycleType
  };
}
