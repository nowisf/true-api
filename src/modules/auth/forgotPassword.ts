import { FastifyReply, FastifyRequest } from "fastify";
import validator from "validator";
import { server } from "../../index";
import bcrypt from "bcrypt";
import { ROUNDS } from "../../env";
import { prisma } from "../../database";

export type ForgotPasswordProps = { token: string; password: string } | { email: string };

interface TokenContent {
  id: number;
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
      return reply.send({"User not found"});
    }
    const token = server.jwt.sign({ email: body.email, id: user.id }, { expiresIn: "15m" });
    1;
    // 2. TODO: Enviar correo con link + token
    return reply.send(`${token} )`);
  }

  const { password, token } = body;

  if (token === "" || password === "") {
    return reply.code(400).send("All fields are required");
  }

  const decodedToken = server.jwt.decode(token) as TokenContent;
  if (!decodedToken) {
    return reply.send("unvalid");
  }
  const encryptedPassword = await bcrypt.hash(password.trim(), ROUNDS);
  const post = await prisma.user.update({
    where: { email: decodedToken.email },
    data: { password: encryptedPassword },
  });
  console.log(post);

  return reply.send("Password changed");
};
