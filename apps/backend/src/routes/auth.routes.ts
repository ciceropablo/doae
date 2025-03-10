import { FastifyInstance } from "fastify";
import { loginHandler, registerHandler } from "../controllers/auth.controller";
import { authSchemas } from "../docs/auth.docs";

export async function authRoutes(app: FastifyInstance) {
  app.post("/register", {
    schema: authSchemas.register,
    handler: registerHandler,
  });

  app.post("/login", {
    schema: authSchemas.login,
    handler: loginHandler,
  });
}
