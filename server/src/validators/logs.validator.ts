import { z } from "zod";

export const createDailyLogSchema = z.object({
  log_date: z.string().date(),
  mood: z.string().optional(),
  symptoms: z.array(z.string()).optional(),
  notes: z.string().max(1000).optional()
});

export type CreateDailyLogInput = z.infer<typeof createDailyLogSchema>;
