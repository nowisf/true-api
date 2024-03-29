import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../database";
import bcrypt from "bcrypt";
import { server } from "../../fastify";
import { LoginRequest } from "./types";

export async function login(req: LoginRequest, reply: FastifyReply) {
  const { usernameOrEmail, password } = req.body;

  if (!usernameOrEmail || !password) {
    return reply.code(400).send({ error: "All fields are required" });
  }

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username: usernameOrEmail }, { email: usernameOrEmail.toLowerCase() }],
      active: true,
      deletedAt: null,
    },
  });
  if (!user) {
    return reply.code(404).send({ error: "User not found" });
  }

  const passwordsAreEqual = await bcrypt.compare(password, user.password);
  if (!passwordsAreEqual) {
    return reply.code(401).send({ error: "Incorrect user or password" });
  }

  const token = server.jwt.sign({ id: user.id, email: user.email }, { expiresIn: "7d" });
  return reply.send({ token });
}
