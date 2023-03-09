import { FastifyInstance } from "fastify";

export const health = (fastify: FastifyInstance) => {
  fastify.route({
    method: "GET",
    url: "/health",
    handler: (_req, reply) => {
      reply.status(200).send({ status: "ok" });
    },
  });
};
