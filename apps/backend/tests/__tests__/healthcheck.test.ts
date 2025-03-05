import { describe, it, expect } from "vitest";
import { request } from "../setup";

describe("Healthcheck", () => {
  it("should return ok", async () => {
    const response = await request.get("/api/v1/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });
});
