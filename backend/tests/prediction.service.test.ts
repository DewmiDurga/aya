import { predictNextPeriod } from "../src/services/prediction.service";

describe("Cycle Prediction Engine", () => {
  it("returns null when fewer than 2 cycle dates are provided", () => {
    expect(predictNextPeriod(["2026-01-01"])).toBeNull();
  });

  it("predicts high confidence for a regular 28-day cycle", () => {
    const dates = ["2026-01-01", "2026-01-29", "2026-02-26", "2026-03-26"];
    const result = predictNextPeriod(dates);
    expect(result).not.toBeNull();
    expect(result?.confidence).toBe("high");
    expect(result?.cycleType).toBe("regular");
    expect(result?.predictedStart).toBe("2026-04-23");
  });

  it("handles irregular cycle lengths with low confidence and wider ranges", () => {
    const dates = ["2026-01-01", "2026-01-20", "2026-02-25", "2026-03-10"];
    const result = predictNextPeriod(dates);
    expect(result).not.toBeNull();
    expect(result?.confidence).toBe("low");
    expect(result?.cycleType).toBe("irregular");
  });
});
