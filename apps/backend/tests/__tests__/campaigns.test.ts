import { describe, it, expect, beforeEach } from "vitest";
import { request } from "../setup";
import { resetDatabase } from "../utils/resetDatabase";
import { prisma } from "../../src/plugins/prisma";
import { User } from "@prisma/client";

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

  // Cria usuário mock no banco para satisfazer a constraint
  await prisma.user.create({
    data: {
      id: "mock-admin-id",
      email: "admin@doae.com",
      role: "ADMIN",
      name: "Admin User",
      password: "admin123",
    },
  });
});

describe("Campaigns", () => {
  it("should create a campaign (ADMIN)", async () => {
    const response = await request
      .post("/api/v1/campaigns")
      .set("Authorization", "Bearer mock-admin-token")
      .send({
        title: "Test Campaign",
        description: "Helping communities",
        goalAmount: 1000,
      });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      title: "Test Campaign",
      description: "Helping communities",
      goalAmount: 1000,
      currentAmount: 0,
      status: "OPEN",
    });
  });

  it("should deny creation if not ADMIN", async () => {
    const response = await request
      .post("/api/v1/campaigns")
      .set("Authorization", "Bearer mock-user-token")
      .send({
        title: "Unauthorized Campaign",
        description: "Should not pass",
        goalAmount: 500,
      });

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      message: "Only admins can access this resource",
    });
  });

  it("should return 400 when creating a campaign with invalid data", async () => {
    const response = await request
      .post("/api/v1/campaigns")
      .set("Authorization", "Bearer mock-admin-token")
      .send({}); // Dados faltando

    expect(response.status).toBe(400);
  });

  it("should return 401 when creating a campaign without authentication", async () => {
    const response = await request.post("/api/v1/campaigns").send({
      title: "New Campaign",
      description: "Description of the new campaign",
      goalAmount: 1000,
    });

    expect(response.status).toBe(401);
  });

  describe("Closing a campaign", () => {
    it("should return 400 when closing an already closed campaign", async () => {
      await prisma.campaign.update({
        where: { id: "mock-campaign-id" },
        data: { status: "CLOSED" },
      });

      const response = await request
        .post("/api/v1/campaigns/mock-campaign-id/close")
        .set("Authorization", "Bearer mock-admin-token");

      expect(response.status).toBe(400); // ou 409 se preferir
    });

    it("should return 401 when closing a campaign without authentication", async () => {
      const response = await request.post(
        "/api/v1/campaigns/mock-campaign-id/close"
      );

      expect(response.status).toBe(401);
    });

    it("should return 403 when regular user tries to close a campaign", async () => {
      const response = await request
        .post("/api/v1/campaigns/mock-campaign-id/close")
        .set("Authorization", "Bearer mock-user-token");

      expect(response.status).toBe(403);
    });
  });
});
