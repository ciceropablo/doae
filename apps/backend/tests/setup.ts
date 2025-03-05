import { beforeAll, afterAll } from "vitest";
import { buildApp } from "../src/app";
import { config } from "../src/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export let app: Awaited<ReturnType<typeof buildApp>>;
export let request: ReturnType<typeof import("supertest")>;

beforeAll(async () => {
  process.env.NODE_ENV = "test";

  app = await buildApp();
  await app.listen({ port: config.server.port });

  const supertest = (await import("supertest")).default;
  request = supertest(app.server);
});

afterAll(async () => {
  await app.close();
  await prisma.$disconnect();
});
