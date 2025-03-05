import fromZodSchema from "zod-to-json-schema";
import {
  createCampaignSchema,
  updateCampaignSchema,
} from "../schemas/campaigns.schema";

export const campaignSchemas = {
  createCampaign: {
    description: "Create a new campaign",
    tags: ["Campaigns"],
    body: fromZodSchema(createCampaignSchema),
    response: {
      201: {
        description: "Campaign created successfully",
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          goalAmount: { type: "number" },
          currentAmount: { type: "number" },
          status: { type: "string", enum: ["OPEN", "CLOSED"] },
        },
      },
    },
  },

  updateCampaign: {
    description: "Update a campaign",
    tags: ["Campaigns"],
    body: fromZodSchema(updateCampaignSchema),
    params: {
      type: "object",
      properties: { id: { type: "string" } },
    },
  },

  getCampaignDetails: {
    description: "Get details of a specific campaign",
    tags: ["Campaigns"],
    params: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
    },
    response: {
      200: {
        description: "Campaign details",
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          goalAmount: { type: "number" },
          currentAmount: { type: "number" },
          status: { type: "string", enum: ["OPEN", "CLOSED"] },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      404: {
        description: "Campaign not found",
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },

  listCampaigns: {
    description: "List all open campaigns",
    tags: ["Campaigns"],
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
            goalAmount: { type: "number" },
            currentAmount: { type: "number" },
            status: { type: "string", enum: ["OPEN", "CLOSED"] },
          },
        },
      },
    },
  },

  closeCampaign: {
    description: "Close a campaign",
    tags: ["Campaigns"],
    params: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
    },
    response: {
      200: {
        description: "Campaign closed successfully",
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },

  getCampaignSummary: {
    description: "Get donation summary for a campaign",
    tags: ["Campaigns"],
    params: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
    },
    response: {
      200: {
        description: "Summary of campaign donations",
        type: "object",
        properties: {
          goalAmount: { type: "number" },
          currentAmount: { type: "number" },
          progressPercentage: { type: "string" },
        },
      },
    },
  },

  listCampaignDonations: {
    description: "List all donations of a campaign",
    tags: ["Donations"],
    params: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
    },
    response: {
      200: {
        description: "List of donations",
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            amount: { type: "number" },
            createdAt: { type: "string", format: "date-time" },
            user: {
              type: "object",
              properties: {
                id: { type: "string" },
                name: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
};
