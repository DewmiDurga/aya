import { z } from "zod";

export const updateProfileSchema = z.object({
  date_of_birth: z.string().date().optional(),
  height_cm: z.number().positive().optional(),
  weight_kg: z.number().positive().optional(),
  menarche_date: z.string().date().optional(),
  is_on_contraception: z.boolean().optional(),
  has_pcos: z.boolean().optional(),
  has_thyroid_condition: z.boolean().optional()
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
