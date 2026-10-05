import { z } from "zod";

export const UpdateProfileSchema = z.object({
  display_name: z.string().max(100).optional().nullable(),
  average_cycle_length: z.number().int().min(15).max(60).optional(),
  average_period_duration: z.number().int().min(1).max(15).optional(),
  is_cycle_regular: z.boolean().optional()
});
