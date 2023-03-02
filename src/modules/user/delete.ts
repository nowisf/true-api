import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../database";
import { RequestParams } from "./types";

export async function ddelete(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as RequestParams;
  const user = prisma.user.findUnique({ where: { id } });
  if (!user) {
    return reply.code(404).send("User not found");
  }
  prisma.user.delete({ where: { id } });

  return reply.send(user);
}
