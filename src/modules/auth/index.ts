import { FastifyPluginCallback } from "fastify";
import { signup } from "./signup";
import { login } from "./login";
import { forgotPassword } from "./forgotPassword";

export const auth: FastifyPluginCallback = async (fastify, _opts, next) => {
  fastify.route({
    method: "POST",
    url: "/signup",
    handler: signup,
  });

  fastify.route({
    method: "POST",
    url: "/login",
    handler: login,
  });

  fastify.route({
    method: "POST",
    url: "/forgot-password",
    handler: forgotPassword,
  });

  next();
};
