import httpClient from "../httpClient";

export type DonationPayload = {
  amount: number;
};

export async function createDonation(
  campaignId: string,
  payload: DonationPayload
) {
  return httpClient(`/campaigns/${campaignId}/donations`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
