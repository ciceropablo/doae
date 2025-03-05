import { FastifyReply, FastifyRequest } from "fastify";

export async function healthHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  return reply.status(200).send({ status: "ok" });
}
