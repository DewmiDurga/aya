import { z } from "zod";

export const SendChatMessageSchema = z.object({
  message: z.string().min(1, "Message cannot be empty").max(1000)
});
