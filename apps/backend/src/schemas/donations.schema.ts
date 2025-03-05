import { z } from "zod";

export const createDonationSchema = z.object({
  amount: z.number().positive("Donation amount must be greater than 0"),
});

// Tipos derivados
export type CreateDonationInput = z.infer<typeof createDonationSchema>;
