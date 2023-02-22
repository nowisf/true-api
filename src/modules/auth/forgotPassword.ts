import { FastifyReply, FastifyRequest } from "fastify";
import validator from "validator";
import { server } from "../../index";
import bcrypt from "bcrypt";
import { prisma } from "../../database";
import { ROUNDS } from "../../constants";

export type ForgotPasswordProps = { token: string; password: string } | { email: string };

interface TokenContent {
  id: string;
  email: string;
}

export const forgotPassword = async (req: FastifyRequest, reply: FastifyReply) => {
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

  const tokenIsValid = server.jwt.verify(token);
  if (!tokenIsValid) {
    return reply.code(401).send("Token expired");
  }

  const decodedToken = server.jwt.decode(token) as TokenContent;
  if (!decodedToken) {
    return reply.code(401).send("Token is invalid");
  }
  const encryptedPassword = await bcrypt.hash(password.trim(), ROUNDS);
  await prisma.user.update({
    where: { id: decodedToken.id },
    data: { password: encryptedPassword },
  });

  return reply.send("Password changed");
};
