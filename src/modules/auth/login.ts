import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../database";
import bcrypt from "bcrypt";
import { server } from "../../index";

export interface LoginProps {
  usernameOrEmail: string;
  password: string;
}

export const login = async (req: FastifyRequest, reply: FastifyReply) => {
  const { usernameOrEmail, password } = req.body as LoginProps;

  if (usernameOrEmail === "" || password === "") {
    return reply.code(400).send("All fields are required");
  }

  const user = await prisma.user.findFirst({
    where: { OR: [{ username: usernameOrEmail }, { email: usernameOrEmail.toLowerCase() }] },
  });
  if (!user) {
    return reply.code(404).send("User not found");
  }

  const passwordsAreEqual = await bcrypt.compare(password, user.password);
  if (!passwordsAreEqual) {
    return reply.code(401).send("Incorrect User or Password");
  }

  const token = server.jwt.sign({ id: user.id, email: user.email });
  return reply.send(token);
};
