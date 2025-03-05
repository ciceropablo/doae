import { describe, it, expect } from "vitest";
import { request } from "../setup";

describe("Auth", () => {
  it("should return mock token for admin", async () => {
    const response = await request
      .post("/api/v1/auth/login")
      .send({ email: "admin@doae.com", password: "password" });

    expect(response.status).toBe(200);
    expect(response.body.token).toBe("mock-admin-token");
  });

  it("should return mock token for user", async () => {
    const response = await request
      .post("/api/v1/auth/login")
      .send({ email: "user@doae.com", password: "password" });

    expect(response.status).toBe(200);
    expect(response.body.token).toBe("mock-user-token");
  });
});
