import { FastifyReply, FastifyRequest } from "fastify";
import validator from "validator";
import { server } from "../../index";
import bcrypt from "bcrypt";
import { ROUNDS } from "../../env";
import { prisma } from "../../database";

export type ForgotPasswordProps = { token: string; password: string } | { email: string };

export const forgotPassword = async (req: FastifyRequest, reply: FastifyReply) => {
  const body = req.body as ForgotPasswordProps;

  if ("email" in body) {
    if (!validator.isEmail(body.email)) {
      return reply.code(400).send("Email is not valid");
    }
    const user = await prisma.user.findFirst({ where: { email: body.email } });
    if (!user) {
      return reply.send("Invalido");
    }

    // 1. Generar token que expire en 15 minutos
    const token = server.jwt.sign({ email: body.email, id: user.id }, { expiresIn: "15m" });
    1;
    // 2. TODO: Enviar correo con link + token
    return reply.send(`an email with instructions was sent to you (test:token:${token} )`);
  }

  const { password, token } = body;

  if (token === "" || password === "") {
    return reply.code(400).send("All fields are required");
  }

  const decodedToken = server.jwt.decode(token);

  // Cambiar la clave

  const post = await prisma.user.update({
    where: { email: decodedToken.email },
    data: { password },
  });
  console.log(post);

  return reply.send("Password changed");
};
