import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../database";
import { RequestParams } from "./types";

export async function deleteUser(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as RequestParams;

  const user = prisma.user.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
  if (!user) {
    return reply.code(404).send("User not found");
  }

  return reply.send({ user });
}
