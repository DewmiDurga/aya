import { z } from "zod";

export const createPeriodLogSchema = z.object({
  start_date: z.string().date(),
  end_date: z.string().date().optional(),
  flow_intensity: z.enum(["light", "medium", "heavy"]).optional()
});

export type CreatePeriodLogInput = z.infer<typeof createPeriodLogSchema>;
