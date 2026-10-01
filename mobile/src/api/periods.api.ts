import { apiClient } from "./client";

export interface PeriodLogInput {
  start_date: string;
  end_date?: string;
  flow_intensity?: "light" | "medium" | "heavy";
}

export const periodsApi = {
  list: () => apiClient.get("/periods"),
  create: (log: PeriodLogInput) => apiClient.post("/periods", log),
  remove: (id: string) => apiClient.delete(`/periods/${id}`)
};
