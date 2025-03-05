import { FastifyInstance } from "fastify";
import { createDonationHandler } from "../controllers/donations.controller";
import { donationSchemas } from "../docs/donations.docs";
import { requireUser } from "../plugins/authorization";

export async function donationRoutes(app: FastifyInstance) {
  // criar doação (mock auth como user)
  app.post("/donations", {
    schema: donationSchemas.createDonation,
    preHandler: [requireUser],
    handler: createDonationHandler,
  });
}
