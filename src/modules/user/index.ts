import { FastifyPluginCallback } from "fastify";
import { requireAdmin } from "../../middlewares/admin";
import { create } from "./create";
import { update } from "./update";

export const user: FastifyPluginCallback = async (fastify, _opts, next) => {
  fastify.route({
    method: "PUT",
    url: "/users/:id",
    onRequest: requireAdmin,
    handler: update,
  });

  fastify.route({
    method: "POST",
    url: "/users/",
    onRequest: requireAdmin,
    handler: create,
  });

  next();
};
