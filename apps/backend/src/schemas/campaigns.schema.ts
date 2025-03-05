import { z } from "zod";

export const createCampaignSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  goalAmount: z.number().positive("Goal amount must be greater than 0"),
});

export const updateCampaignSchema = z.object({
  title: z.string().min(5).optional(),
  description: z.string().min(10).optional(),
  goalAmount: z.number().positive().optional(),
});

// Tipos derivados
export type CreateCampaignInput = z.infer<typeof createCampaignSchema>;
export type UpdateCampaignInput = z.infer<typeof updateCampaignSchema>;
