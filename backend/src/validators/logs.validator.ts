import { z } from "zod";

export const UpsertDailyLogSchema = z.object({
  log_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "log_date must be formatted YYYY-MM-DD"),
  mood: z.string().max(50).optional().nullable(),
  symptoms: z.array(z.string().max(50)).default([]),
  notes: z.string().max(1000).optional().nullable()
});
