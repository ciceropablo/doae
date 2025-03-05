import { FastifyReply, FastifyRequest } from "fastify";
import { createDonation } from "../services/donations.service";
import { CreateDonationInput } from "../schemas/donations.schema";

export async function createDonationHandler(
  request: FastifyRequest<{
    Body: CreateDonationInput;
    Params: { campaignId: string };
  }>,
  reply: FastifyReply
) {
  // TODO: Tratar o erro na camada de serviço
  try {
    const donation = await createDonation({
      campaignId: request.params.campaignId,
      amount: request.body.amount,
      userId: request.user!.id,
    });

    return reply.status(201).send(donation);
  } catch (error) {
    return reply.status(404).send({ message: "Campaign not found" });
  }
}
