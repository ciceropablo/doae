import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Cria usuário mock no banco para satisfazer a constraint
  await prisma.user.create({
    data: {
      id: "mock-user-id",
      email: "user@doae.com",
      role: "USER",
      name: "Regular User",
      password: "user123",
    } as User,
  });

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
