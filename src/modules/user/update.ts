import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../database";
import { RequestParams, UserUpdateProps } from "./types";

export async function update(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as RequestParams;

  const { password, role, active } = req.body as UserUpdateProps;

  const user = await prisma.user.update({
    where: { id },
    data: { password, role, active },
  });

  if (!user) {
    return reply.code(404).send("User not found");
  }
  return reply.send({ user });
import { UserUpdateProps } from "./types";

interface RequestParams {
  id: string;
}

export async function update(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as RequestParams;
  const user = prisma.user.findUnique({ where: { id } });
  if (!user) {
    return reply.code(404).send("User not found");
  }

  const { password, role, active } = req.body as UserUpdateProps;

  await prisma.user.update({
    where: { id },
    data: { password, role, active },
  });
>>>>>>> 5dd2e1e (feat: add update user endpoint to admins)
}
