import {
  FastifyError,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { ZodError } from "zod";

export async function errorHandlerPlugin(app: FastifyInstance) {
  app.setErrorHandler(
    (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
      // Se for erro de validação do Fastify (Zod)
      if (error.validation || error instanceof ZodError) {
        return reply.status(400).send({
          status: "error",
          message: "Invalid request data",
          details: error.message,
        });
      }

      // Tratamento para erros de permissão
      if (error.statusCode === 403) {
        return reply.status(403).send({
          status: "error",
          message: error.message || "Forbidden",
        });
      }

      // Not Found (404)
      if (error.statusCode === 404) {
        return reply.status(404).send({
          status: "error",
          message: error.message || "Not Found",
        });
      }

      // Log do erro interno (apenas para debug local ou monitoramento em produção)
      app.log.error(error);

      // Resposta genérica para erros inesperados
      return reply.status(500).send({
        status: "error",
        message: "Internal server error",
      });
    }
  );
}
