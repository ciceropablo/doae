import { prisma } from "../plugins/prisma";

export async function getCampaignById(id: string) {
  return prisma.campaign.findUnique({
    where: { id },
  });
}

export async function updateCampaign(
  id: string,
  data: { title?: string; description?: string; goalAmount?: number }
) {
  return prisma.campaign.update({
    where: { id },
    data,
  });
}

export async function closeCampaign(id: string) {
  const campaign = await prisma.campaign.findUnique({
    where: { id },
    select: {
      status: true,
    },
  });

  if (!campaign) {
    return Promise.reject("Campaign not found");
  }

  if (campaign?.status === "CLOSED") {
    return Promise.reject("Campaign already closed");
  }

  return prisma.campaign.update({
    where: { id },
    data: { status: "CLOSED" },
  });
}

export async function getCampaignSummary(id: string) {
  const campaign = await prisma.campaign.findUnique({
    where: { id },
    select: {
      goalAmount: true,
      currentAmount: true,
    },
  });

  if (!campaign) return null;

  return {
    goalAmount: Number(campaign.goalAmount),
    currentAmount: Number(campaign.currentAmount),
    progressPercentage: (
      (Number(campaign.currentAmount) / Number(campaign.goalAmount)) *
      100
    ).toFixed(2),
  };
}

export async function listCampaignDonations(id: string) {
  return prisma.donation.findMany({
    where: { campaignId: id },
    include: {
      user: {
        select: { id: true, name: true },
      },
    },
  });
}

export async function createCampaign(data: {
  title: string;
  description: string;
  goalAmount: number;
}) {
  return prisma.campaign.create({
    data: {
      title: data.title,
      description: data.description,
      goalAmount: data.goalAmount,
    },
  });
}

export async function listCampaigns() {
  return prisma.campaign.findMany({
    where: { status: "OPEN" },
  });
}
