import { predictNextPeriod } from "../src/services/prediction.service";
import { daysBetween, addDays, mean, stdDev } from "../src/utils/dateMath";

describe("Cycle Prediction Engine", () => {
  describe("Statistical Utility Functions in Isolation", () => {
    it("calculates mean accurately", () => {
      expect(mean([])).toBe(0);
      expect(mean([28, 28, 28])).toBe(28);
      expect(mean([26, 28, 30])).toBe(28);
    });

    it("calculates sample standard deviation accurately", () => {
      expect(stdDev([])).toBe(0);
      expect(stdDev([28])).toBe(0);
      expect(stdDev([28, 28, 28])).toBe(0);
      // Standard deviation of [26, 28, 30] is 2
      expect(stdDev([26, 28, 30])).toBe(2);
    });

    it("calculates day differences and future dates correctly", () => {
      expect(daysBetween("2026-01-01", "2026-01-29")).toBe(28);
      expect(addDays("2026-01-01", 28)).toBe("2026-01-29");
    });
  });

  describe("Minimum Data Requirements", () => {
    it("returns null when fewer than 2 cycle dates are provided", () => {
      expect(predictNextPeriod([])).toBeNull();
      expect(predictNextPeriod(["2026-01-01"])).toBeNull();
    });

    it("returns low confidence when only 2 cycle dates (1 interval) are provided", () => {
      const result = predictNextPeriod(["2026-01-01", "2026-01-29"]);
      expect(result).not.toBeNull();
      expect(result?.confidence).toBe("low");
      expect(result?.avgCycleLength).toBe(28);
    });
  });

  describe("Regular Cycle Scenario (Consistent ~28-day gaps)", () => {
    it("returns high-confidence and narrow prediction range for consistent 28-day cycles", () => {
      // 4 consecutive periods with exact 28-day gaps
      const regularDates = [
        "2026-01-01",
        "2026-01-29",
        "2026-02-26",
        "2026-03-26"
      ];

      const result = predictNextPeriod(regularDates);

      expect(result).not.toBeNull();
      expect(result?.confidence).toBe("high");
      expect(result?.cycleType).toBe("regular");
      expect(result?.avgCycleLength).toBe(28);
      expect(result?.stdDevDays).toBe(0);
      expect(result?.predictedStart).toBe("2026-04-23");

      // Verify narrow range window (±2 days minimum margin)
      expect(result?.rangeLow).toBe("2026-04-21");
      expect(result?.rangeHigh).toBe("2026-04-25");
      expect(daysBetween(result!.rangeLow, result!.rangeHigh)).toBe(4);
    });

    it("maintains regular classification for minor physiological variations (±1 to 2 days)", () => {
      // Gaps: 27 days, 28 days, 29 days (stdDev ~ 1.0)
      const nearRegularDates = [
        "2026-01-01",
        "2026-01-28", // gap = 27
        "2026-02-25", // gap = 28
        "2026-03-26"  // gap = 29
      ];

      const result = predictNextPeriod(nearRegularDates);

      expect(result).not.toBeNull();
      expect(result?.confidence).toBe("high");
      expect(result?.cycleType).toBe("regular");
      expect(result?.stdDevDays).toBeLessThanOrEqual(3.0);
    });
  });

  describe("Irregular Cycle Scenario (Highly variable gaps)", () => {
    it("returns low-confidence and wider prediction range for fluctuating cycle lengths", () => {
      // Variable intervals: 20 days, 36 days, 45 days, 23 days
      const irregularDates = [
        "2026-01-01",
        "2026-01-21", // gap = 20
        "2026-02-26", // gap = 36
        "2026-04-12", // gap = 45
        "2026-05-05"  // gap = 23
      ];

      const result = predictNextPeriod(irregularDates);

      expect(result).not.toBeNull();
      expect(result?.confidence).toBe("low");
      expect(result?.cycleType).toBe("irregular");
      expect(result?.stdDevDays).toBeGreaterThan(6.0);

      // Verify wider margin window reflecting cycle variability
      const windowSpan = daysBetween(result!.rangeLow, result!.rangeHigh);
      expect(windowSpan).toBeGreaterThanOrEqual(14); // Wide window for high variance
    });
  });
});
