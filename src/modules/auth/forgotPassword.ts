import { FastifyReply, FastifyRequest } from "fastify";
import validator from "validator";
import { server } from "../../fastify";
import bcrypt from "bcrypt";
import { prisma } from "../../database";
import { ForgotPasswordProps } from "./types";
import { ROUNDS } from "../../env";
import { decodeToken } from "../../utils/token";

export async function forgotPassword(req: FastifyRequest, reply: FastifyReply) {
  const body = req.body as ForgotPasswordProps;

  if ("email" in body) {
    if (!validator.isEmail(body.email)) {
      return reply.code(400).send("Email is not valid");
    }
    const user = await prisma.user.findFirst({ where: { email: body.email } });
    if (!user) {
      return reply.code(404).send("User not found");
    }
    const token = server.jwt.sign({ email: body.email, id: user.id }, { expiresIn: "15m" });
    1;
    // 2. TODO: Enviar correo con link + token
    return reply.send({ token });
  }

  const { password, token } = body;

  if (token === "" || password === "") {
    return reply.code(400).send("All fields are required");
  }

  const decoded = decodeToken(token);

  const encryptedPassword = await bcrypt.hash(password.trim(), ROUNDS);
  await prisma.user.update({
    where: { id: decoded.id },
    data: { password: encryptedPassword },
  });

  return reply.send("Password changed");
}
