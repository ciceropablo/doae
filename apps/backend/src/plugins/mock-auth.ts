import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

type User = {
  id: string;

  role: "ADMIN" | "USER";
};

// Mapeamos tokens fixos para usuários fixos (apenas para simulação)
const MOCK_TOKENS: Record<string, User> = {
  "mock-admin-token": {
    id: "mock-admin-id",
    // email: "admin@doae.com",
    role: "ADMIN",
  },
  "mock-user-token": {
    id: "mock-user-id",
    // email: "user@doae.com",
    role: "USER",
  },
};

declare module "fastify" {
  interface FastifyRequest {
    user?: User;
  }
}

export async function mockAuthPlugin(app: FastifyInstance) {
  app.addHook(
    "onRequest",
    (request: FastifyRequest, reply: FastifyReply, done) => {
      const authHeader = request.headers.authorization;
      if (!authHeader) {
        request.user = undefined;
        return done(); // Sem auth, rota pública
      }

      const token = authHeader.replace("Bearer ", "");
      const user = MOCK_TOKENS[token];
      if (!user) {
        return reply.status(401).send({ message: "Invalid or missing token" });
      }

      request.user = user;
      done();
    }
  );
}
