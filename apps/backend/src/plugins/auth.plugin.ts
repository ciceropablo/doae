import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

type User = {
  id: string;
  role: "ADMIN" | "USER";
};

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }

  interface FastifyRequest {
    user?: User;
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function authPlugin(app: FastifyInstance) {
  app.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const authHeader = request.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return reply.status(401).send({ message: "Missing or invalid token" });
      }

      const token = authHeader.replace("Bearer ", "");

      try {
        const payload = jwt.verify(token, JWT_SECRET) as {
          sub: string;
          role: "USER" | "ADMIN";
        };
        request.user = {
          id: payload.sub,
          role: payload.role,
        };
      } catch {
        return reply.status(401).send({ message: "Invalid token" });
      }
    }
  );
}
