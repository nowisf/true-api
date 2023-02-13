import { FastifyPluginCallback } from "fastify";

export const auth: FastifyPluginCallback = (fastify, _opts, next) => {
  fastify.post("/signup", async (_req, reply) => {});

  next();
};
