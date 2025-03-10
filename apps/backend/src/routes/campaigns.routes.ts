import { FastifyInstance } from "fastify";
import {
  closeCampaignHandler,
  createCampaignHandler,
  getCampaignDetailsHandler,
  getCampaignSummaryHandler,
  listCampaignDonationsHandler,
  listCampaignsHandler,
  updateCampaignHandler,
} from "../controllers/campaigns.controller";
import { campaignSchemas } from "../docs/campaigns.docs";
import { requireAdmin } from "../plugins/authorization";

export async function campaignRoutes(app: FastifyInstance) {
  // criar campanha (mock auth como admin)
  app.post("/", {
    schema: campaignSchemas.createCampaign,
    preHandler: [app.authenticate, requireAdmin],
    handler: createCampaignHandler,
  });

  // listar campanhas ativas
  app.get("/", {
    schema: campaignSchemas.listCampaigns,
    handler: listCampaignsHandler,
  });

  // detalhes da campanha
  app.get("/:id", {
    schema: campaignSchemas.getCampaignDetails,
    handler: getCampaignDetailsHandler,
  });

  // atualizar campanha (mock auth como admin)
  app.put("/:id", {
    schema: campaignSchemas.updateCampaign,
    preHandler: [app.authenticate, requireAdmin],
    handler: updateCampaignHandler,
  });

  // fechar campanha (mock auth como admin)
  app.post("/:id/close", {
    schema: campaignSchemas.closeCampaign,
    preHandler: [app.authenticate, requireAdmin],
    handler: closeCampaignHandler,
  });

  // sumário da campanha
  app.get("/:id/summary", {
    schema: campaignSchemas.getCampaignSummary,
    handler: getCampaignSummaryHandler,
  });

  // listar doações da campanha
  app.get("/:id/donations", {
    schema: campaignSchemas.listCampaignDonations,
    preHandler: [app.authenticate, requireAdmin],
    handler: listCampaignDonationsHandler,
  });
}
