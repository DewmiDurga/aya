import { predictNextPeriod } from "../src/services/prediction.service";

describe("predictNextPeriod", () => {
  it("returns null when fewer than 2 period dates are given", () => {
    expect(predictNextPeriod(["2026-01-01"])).toBeNull();
  });

  it("predicts a high-confidence result for a regular cycle", () => {
    const dates = ["2026-01-01", "2026-01-29", "2026-02-26", "2026-03-26"];
    const result = predictNextPeriod(dates);
    expect(result).not.toBeNull();
    expect(result?.confidence).toBe("high");
    expect(result?.cycleType).toBe("regular");
  });

  it("predicts a low-confidence, wider range for an irregular cycle", () => {
    const dates = ["2026-01-01", "2026-01-20", "2026-02-25", "2026-03-05"];
    const result = predictNextPeriod(dates);
    expect(result).not.toBeNull();
    expect(result?.confidence).toBe("low");
    expect(result?.cycleType).toBe("irregular");
  });
});
