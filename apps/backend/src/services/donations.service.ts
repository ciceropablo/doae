import { prisma } from "../plugins/prisma";

export async function createDonation(data: {
  campaignId: string;
  amount: number;
  userId: string;
}) {
  const donation = await prisma.donation.create({
    data: {
      campaignId: data.campaignId,
      amount: data.amount,
      userId: data.userId,
    },
  });

  // Atualizar o progresso da campanha
  await prisma.campaign.update({
    where: { id: data.campaignId },
    data: { currentAmount: { increment: data.amount } },
  });

  return donation;
}
