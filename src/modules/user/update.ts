import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../database";
import { UpdateUserRequest } from "./types";

export async function update(req: UpdateUserRequest, reply: FastifyReply) {
  const { id } = req.params;
  const { password, role, active } = req.body;

  const user = await prisma.user.update({
    where: { id },
    data: { password, role, active },
  });

  if (!user) {
    return reply.code(404).send("User not found");
  }

  return reply.send({ user });
}
