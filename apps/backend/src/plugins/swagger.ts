import { FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { config } from "../config";

export async function swaggerPlugin(app: FastifyInstance) {
  const host = config.server.host;
  const port = config.server.port;
  await app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Doaê API",
        description: "API for the Doaê donation platform",
        version: "1.0.0",
      },
      servers: [{ url: `http://${host}:${port}` }],
    },
  });

  await app.register(fastifySwaggerUi, {
    routePrefix: "/api/docs",
  });
}
