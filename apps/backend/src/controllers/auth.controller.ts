import { FastifyReply, FastifyRequest } from "fastify";
import { LoginInput, RegisterInput } from "../schemas/auth.schema";
import { register, login } from "../services/auth.service";

export async function registerHandler(
  request: FastifyRequest<{ Body: RegisterInput }>,
  reply: FastifyReply
) {
  const { name, email, password } = request.body;
  const res = await register(name, email, password);
  return reply.status(201).send(res);
}

export async function loginHandler(
  request: FastifyRequest<{ Body: LoginInput }>,
  reply: FastifyReply
) {
  const { email, password } = request.body;
  const res = await login(email, password);
  return reply.send(res);
}

export async function _loginHandler(
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
