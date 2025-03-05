import { FastifyReply, FastifyRequest } from "fastify";
import {
  closeCampaign,
  createCampaign,
  getCampaignById,
  getCampaignSummary,
  listCampaignDonations,
  listCampaigns,
  updateCampaign,
} from "../services/campaigns.service";
import {
  CreateCampaignInput,
  UpdateCampaignInput,
} from "../schemas/campaigns.schema";

export async function getCampaignDetailsHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  const campaign = await getCampaignById(id);
  if (!campaign) {
    return reply.status(404).send({ message: "Campaign not found" });
  }
  return reply.send(campaign);
}

export async function updateCampaignHandler(
  request: FastifyRequest<{
    Body: UpdateCampaignInput;
    Params: { id: string };
  }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  const updatedCampaign = await updateCampaign(id, request.body);
  return reply.send(updatedCampaign);
}

export async function closeCampaignHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  // TODO: Tratar o erro na camada de serviço
  try {
    const { id } = request.params;
    await closeCampaign(id);
    return reply.send({ message: "Campaign closed successfully" });
  } catch (error) {
    if (error === "Campaign not found") {
      return reply.status(404).send({ message: error });
    }

    if (error === "Campaign already closed") {
      return reply.status(400).send({ message: error });
    }
  }
}

export async function getCampaignSummaryHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  const summary = await getCampaignSummary(id);
  if (!summary) {
    return reply.status(404).send({ message: "Campaign not found" });
  }
  return reply.send(summary);
}

export async function listCampaignDonationsHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  const donations = await listCampaignDonations(id);
  return reply.send(donations);
}

export async function createCampaignHandler(
  request: FastifyRequest<{ Body: CreateCampaignInput }>,
  reply: FastifyReply
) {
  const campaign = await createCampaign(request.body);
  return reply.status(201).send(campaign);
}

export async function listCampaignsHandler(
  _: FastifyRequest,
  reply: FastifyReply
) {
  const campaigns = await listCampaigns();
  return reply.send(campaigns);
}
