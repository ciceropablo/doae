import Fastify, { FastifyInstance } from "fastify";
import { campaignRoutes } from "./routes/campaigns.routes";
import { donationRoutes } from "./routes/donations.routes";
import { healthRoutes } from "./routes/health.routes";
import { authRoutes } from "./routes/auth.routes";
import { swaggerPlugin } from "./plugins/swagger";
import { errorHandlerPlugin } from "./plugins/error-handler";
import { corsPlugin } from "./plugins/cors";
import { config } from "./config";
import { authPlugin } from "./plugins/auth.plugin";

export async function buildApp() {
  const app = Fastify({
    logger: {
      level: config.logger.level,
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
        },
      },
    },
  });

  await swaggerPlugin(app);
  await corsPlugin(app);
  await authPlugin(app);
  await errorHandlerPlugin(app);
  registerRoutes(app);

  return app;
}

export async function registerRoutes(app: FastifyInstance) {
  app.register(authRoutes, { prefix: "/api/v1/auth" });
  app.register(campaignRoutes, { prefix: "/api/v1/campaigns" });
  app.register(donationRoutes, {
    prefix: "/api/v1/campaigns/:campaignId",
  });
  app.register(healthRoutes, { prefix: "/api/v1" });
}
