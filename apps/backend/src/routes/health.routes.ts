import { FastifyInstance } from "fastify";
import { healthHandler } from "../controllers/health.controller";
import { healthSchemas } from "../docs/health.docs";

export async function healthRoutes(app: FastifyInstance) {
  app.get("/health", {
    schema: healthSchemas.health,
    handler: healthHandler,
  });
}
