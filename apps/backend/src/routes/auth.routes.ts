import { FastifyInstance } from "fastify";
import { loginHandler } from "../controllers/auth.controller";
import { authSchemas } from "../docs/auth.docs";

export async function authRoutes(app: FastifyInstance) {
  app.post("/login", {
    schema: authSchemas.login,
    handler: loginHandler,
  });
}
