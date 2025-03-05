import { describe, it, expect, beforeEach } from "vitest";
import { request } from "../setup";
import { resetDatabase } from "../utils/resetDatabase";
import { prisma } from "../../src/plugins/prisma";

beforeEach(async () => {
  await resetDatabase();

  // Cria uma campanha válida
  await prisma.campaign.create({
    data: {
      id: "mock-campaign-id",
      title: "Test Campaign",
      description: "Help the world",
      goalAmount: 1000,
      currentAmount: 0,
      status: "OPEN",
    },
  });

  // Cria usuários mock no banco para satisfazer a constraint
  await prisma.user.create({
    data: {
      id: "mock-admin-id",
      email: "admin@doae.com",
      role: "ADMIN",
      name: "Admin User",
      password: "admin123",
    },
  });

  await prisma.user.create({
    data: {
      id: "mock-user-id",
      email: "user@doae.com",
      role: "USER",
      name: "Regular User",
      password: "user123",
    },
  });
});

describe("Donations", () => {
  it("should allow USER to donate to a campaign", async () => {
    const campaignResponse = await request
      .post("/api/v1/campaigns")
      .set("Authorization", "Bearer mock-admin-token")
      .send({
        title: "Donation Campaign",
        description: "Accepting donations",
        goalAmount: 2000,
      });

    const campaignId = campaignResponse.body.id;

    const response = await request
      .post(`/api/v1/campaigns/${campaignId}/donations`)
      .set("Authorization", "Bearer mock-user-token")
      .send({ amount: 100 });

    expect(response.status).toBe(201);
    expect(response.body.amount).toBe(100);
  });

  it("should reject donation if not USER", async () => {
    const response = await request
      .post(`/api/v1/campaigns/invalid-id/donations`)
      .set("Authorization", "Bearer mock-admin-token")
      .send({ amount: 100 });

    expect(response.status).toBe(403);
  });

  it("should return 400 when donation amount is invalid", async () => {
    const response = await request
      .post("/api/v1/campaigns/mock-campaign-id/donations")
      .set("Authorization", "Bearer mock-user-token")
      .send({ amount: -50 }); // Valor inválido

    expect(response.status).toBe(400);
  });

  it("should return 404 when donating to non-existent campaign", async () => {
    const response = await request
      .post("/api/v1/campaigns/non-existent-id/donations")
      .set("Authorization", "Bearer mock-user-token")
      .send({ amount: 100 });

    expect(response.status).toBe(404);
  });

  it("should return 401 when donating without authentication", async () => {
    const response = await request
      .post("/api/v1/campaigns/mock-campaign-id/donations")
      .send({ amount: 100 });

    expect(response.status).toBe(401);
  });

  it("should return 403 when admin tries to donate", async () => {
    const response = await request
      .post("/api/v1/campaigns/mock-campaign-id/donations")
      .set("Authorization", "Bearer mock-admin-token")
      .send({ amount: 100 });

    expect(response.status).toBe(403);
  });
});
