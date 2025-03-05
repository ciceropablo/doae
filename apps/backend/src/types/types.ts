// types.ts - Centralized types for Doaê Backend

import { Role, CampaignStatus } from "@prisma/client";

// ===============================
// User Types
// ===============================

export type UserDTO = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

// ===============================
// Campaign Types
// ===============================

export type CreateCampaignInput = {
  title: string;
  description: string;
  goalAmount: number;
};

export type UpdateCampaignInput = {
  title?: string;
  description?: string;
  goalAmount?: number;
};

export type CampaignDTO = {
  id: string;
  title: string;
  description: string;
  goalAmount: number;
  currentAmount: number;
  status: CampaignStatus;
};

export type CampaignSummaryDTO = {
  goalAmount: number;
  currentAmount: number;
};

// ===============================
// Donation Types
// ===============================

export type CreateDonationInput = {
  campaignId: string;
  amount: number;
  userId: string;
};

export type DonationDTO = {
  id: string;
  amount: number;
  campaignId: string;
  userId: string;
  createdAt: Date;
};

// ===============================
// Auth Types
// ===============================

export type LoginInput = {
  email: string;
  password: string;
};

export type AuthResponseDTO = {
  user: UserDTO;
  token: string; // currently mocked
};

// ===============================
// Utils
// ===============================

export function parseDecimal(value: any): number {
  return Number(Number(value).toFixed(2));
}
