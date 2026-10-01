import { apiClient } from "./client";

export const predictionsApi = {
  get: () => apiClient.get("/predictions")
};
