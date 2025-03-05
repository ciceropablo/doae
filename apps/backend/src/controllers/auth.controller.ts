import { FastifyReply, FastifyRequest } from "fastify";
import { LoginInput } from "../schemas/auth.schema";

export async function loginHandler(
  request: FastifyRequest<{ Body: LoginInput }>,
  reply: FastifyReply
) {
  const { email, password } = request.body;

  // Mock simples: qualquer email/senha serve por enquanto
  if (!email || !password) {
    return reply
      .status(400)
      .send({ message: "Email and password are required" });
  }

  if (email === "admin@doae.com") {
    return reply.send({
      user: {
        id: "mock-admin-id",
        email,
        role: "ADMIN",
      },
      token: "mock-admin-token", // futuramente pode ser JWT real
    });
  }

  // Simulamos uma resposta de login
  return reply.send({
    user: {
      id: "mock-user-id",
      email,
      role: "USER",
    },
    token: "mock-user-token", // futuramente pode ser JWT real
  });
}
