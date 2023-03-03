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
}
