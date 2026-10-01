import { useEffect, useState } from "react";
import { predictionsApi } from "../api/predictions.api";
import { PredictionResult } from "../types";

export function useCyclePrediction() {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const result = await predictionsApi.get();
      setPrediction(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load prediction");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return { prediction, loading, error, refresh };
}
