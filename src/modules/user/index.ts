import { FastifyInstance } from "fastify";
import { checkAdmin } from "../../middlewares/admin";
import { create } from "./create";
import { deleteUser } from "./delete";
import { update } from "./update";

export const user = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "PUT",
    url: "/users/:id",
    onRequest: checkAdmin,
    handler: update,
  });

  fastify.route({
    method: "POST",
    url: "/users/",
    onRequest: checkAdmin,
    handler: create,
  });
  fastify.route({
    method: "DELETE",
    url: "/users/:id",
    onRequest: checkAdmin,
    handler: deleteUser,
  });
};
