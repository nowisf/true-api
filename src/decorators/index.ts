import { FastifyPluginCallback } from "fastify";
import { authenticated } from "./authenticated";
import { admin } from "./admin";

export const authDecorator: FastifyPluginCallback = async (fastify, _opts, next) => {
  fastify.decorate("admin", admin);
  fastify.decorate("authenticated", authenticated);

  next();
};
