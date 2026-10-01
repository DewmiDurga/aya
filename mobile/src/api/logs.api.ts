import { apiClient } from "./client";

export interface DailyLogInput {
  log_date: string;
  mood?: string;
  symptoms?: string[];
  notes?: string;
}

export const logsApi = {
  list: (from?: string, to?: string) => {
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    const query = params.toString() ? `?${params.toString()}` : "";
    return apiClient.get(`/logs${query}`);
  },
  upsert: (log: DailyLogInput) => apiClient.post("/logs", log)
};
