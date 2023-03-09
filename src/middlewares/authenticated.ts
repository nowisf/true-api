import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../database";
import { decodeToken } from "../utils/token";

export async function checkAuth(req: FastifyRequest, reply: FastifyReply) {
  try {
    const token = req.headers.authorization?.replace("Bearer", "");

    if (!token) {
      return reply.code(401).send("Unathorized user");
    }

    const decoded = decodeToken(token);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true },
    });

    if (!user) {
      return reply.code(401).send("Unathorized user");
    }
  } catch (err) {
    reply.send(err);
  }
}
