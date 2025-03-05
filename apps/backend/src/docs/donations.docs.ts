import fromZodSchema from "zod-to-json-schema";
import { createDonationSchema } from "../schemas/donations.schema";

export const donationSchemas = {
  createDonation: {
    description: "Create a donation for a campaign",
    tags: ["Donations"],
    body: fromZodSchema(createDonationSchema),
    response: {
      201: {
        description: "Donation created successfully",
        type: "object",
        properties: {
          id: { type: "string" },
          amount: { type: "number" },
          createdAt: { type: "string", format: "date-time" },
        },
      },
    },
  },
};
