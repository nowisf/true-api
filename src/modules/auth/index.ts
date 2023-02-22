import { FastifyPluginCallback } from "fastify";
import { signup } from "./signup";
import { login } from "./login";
import { forgotPassword } from "./forgotPassword";

export const auth: FastifyPluginCallback = async (fastify, _opts, next) => {
  fastify.post("/signup", signup);
  fastify.post("/login", login);
  fastify.post("/forgot-password", forgotPassword);

  next();
};
