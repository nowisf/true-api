import { FastifyReply, FastifyRequest } from "fastify";
import validator from "validator";

export type ForgotPasswordProps = { token: string; password: string } | { email: string };

export const forgotPassword = async (req: FastifyRequest, reply: FastifyReply) => {
  const body = req.body as ForgotPasswordProps;

  if ("email" in body) {
    if (!validator.isEmail(body.email)) {
      return reply.code(400).send("Email is not valid");
    }

    // 1. Generar token que expire en 15 minutos
    // 2. TODO: Enviar correo con link + token
    return reply.send("");
  }

  const { password, token } = body;

  if (token === "" || password === "") {
    return reply.code(400).send("All fields are required");
  }

  // TODO: crear token con awt
  return reply.send("Password restored");
};
