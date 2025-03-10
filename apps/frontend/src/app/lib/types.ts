export type User = {
  id: number;
  name: string;
  email: string;
};

export type CampaignStatus = "OPEN" | "CLOSED";

export type Campaign = {
  id: number;
  title: string;
  description: string;
  goalAmount: number;
  currentAmount: number;
  status: CampaignStatus;
};
