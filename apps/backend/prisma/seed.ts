import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  //   const adminPassword = await hash("admin123", 10);

  // Criar admin e user para o mock de login
  const admin = await prisma.user.upsert({
    where: { email: "admin@doae.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@doae.com",
      password: "admin123", // No futuro será hash
      role: "ADMIN",
    },
  });

  const user = await prisma.user.upsert({
    where: { email: "user@doae.com" },
    update: {},
    create: {
      name: "Regular User",
      email: "user@doae.com",
      password: "user123",
      role: "USER",
    },
  });

  // Criar algumas campanhas fictícias
  const campaigns = await prisma.campaign.createMany({
    data: [
      {
        title: "Water for Everyone",
        description: "Campaign to provide clean water.",
        goalAmount: 10000,
        currentAmount: 2000,
        status: "OPEN",
      },
      {
        title: "Books for Kids",
        description: "Providing books for schools in rural areas.",
        goalAmount: 5000,
        currentAmount: 1500,
        status: "OPEN",
      },
    ],
    skipDuplicates: true, // Caso já rode mais de uma vez
  });

  // Criar algumas doações de exemplo
  const campaign = await prisma.campaign.findFirst({
    where: { title: "Water for Everyone" },
  });

  if (campaign) {
    await prisma.donation.create({
      data: {
        amount: 100,
        campaignId: campaign.id,
        userId: user.id,
      },
    });
  }

  console.log("✅ Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
