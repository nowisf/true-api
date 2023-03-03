import { FastifyPluginCallback } from "fastify";

export const health: FastifyPluginCallback = (fastify, _opts, next) => {
  fastify.route({
    method: "GET",
    url: "/health",
    handler: (_req, reply) => {
      reply.status(200).send({ status: "ok" });
    },
  });

  next();
};
