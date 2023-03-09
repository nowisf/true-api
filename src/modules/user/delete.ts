import { FastifyReply } from "fastify";
import { prisma } from "../../database";
import { DeleteUserRequest } from "./types";

export async function deleteUser(req: DeleteUserRequest, reply: FastifyReply) {
  const { id } = req.params;

  const user = prisma.user.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
  if (!user) {
    return reply.code(404).send("User not found");
  }

  return reply.send({ user });
}
