import { z } from "zod";

export const CreatePeriodSchema = z.object({
  start_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "start_date must be formatted YYYY-MM-DD"),
  end_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "end_date must be formatted YYYY-MM-DD")
    .optional()
    .nullable(),
  flow_intensity: z
    .enum(["light", "medium", "heavy", "spotting"])
    .optional()
    .default("medium")
});
