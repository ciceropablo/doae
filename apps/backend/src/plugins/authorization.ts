import { FastifyRequest, FastifyReply } from "fastify";

export function requireAdmin(
  request: FastifyRequest,
  reply: FastifyReply,
  done: () => void
) {
  if (!request.user) {
    reply.status(401).send({ message: "Invalid or missing token" });
  }

  if (request.user?.role !== "ADMIN") {
    reply.status(403).send({ message: "Only admins can access this resource" });
  } else {
    done();
  }
}

export function requireUser(
  request: FastifyRequest,
  reply: FastifyReply,
  done: () => void
) {
  if (!request.user) {
    reply.status(401).send({ message: "Invalid or missing token" });
  }

  if (request.user?.role !== "USER") {
    reply.status(403).send({ message: "Only users can access this resource" });
  } else {
    done();
  }
}
