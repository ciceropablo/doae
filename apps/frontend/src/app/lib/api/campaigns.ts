import httpClient from "../httpClient";
import { Campaign } from "../types";

export type CampaignsResponse = Campaign[];

export async function fetchCampaigns(): Promise<CampaignsResponse> {
  return httpClient<CampaignsResponse>("/campaigns", {
    cache: "no-store",
  });
}

export type CreateCampaignBody = {
  title: string;
  description: string;
  goalAmount: number;
};

export type CreateCampaignResponse = Campaign;

export async function createCampaign(
  body: CreateCampaignBody
): Promise<CreateCampaignResponse> {
  return httpClient<Campaign>("/campaigns", {
    method: "POST",
    body: JSON.stringify(body),
  });
}
