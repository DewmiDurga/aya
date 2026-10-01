import { apiClient } from "./client";

export const chatApi = {
  send: (message: string) => apiClient.post("/chat", { message })
};
