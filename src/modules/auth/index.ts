import { FastifyPluginCallback } from "fastify";
import { signup } from "./signup";
import { login } from "./login";

export const auth: FastifyPluginCallback = async (fastify, _opts, next) => {
  fastify.post("/signup", signup);
  fastify.post("/login", login);

  next();
};
