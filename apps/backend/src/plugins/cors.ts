import { FastifyInstance } from "fastify";
import fastifyCors from "@fastify/cors";
import { config } from "../config";

export async function corsPlugin(app: FastifyInstance) {
  await app.register(fastifyCors, {
    origin: (origin, cb) => {
      if (!origin || config.cors.allowedOrigins.includes(origin)) {
        cb(null, true);
      } else {
        cb(new Error("Not allowed by CORS"), false);
      }
    },
    credentials: true,
  });
}
