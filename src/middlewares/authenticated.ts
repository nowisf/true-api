import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../database";
import { decodeToken } from "../utils/token";
import { AuthHolder } from "./types";

export async function requireAuth(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { authorization } = req.headers as AuthHolder;

    const decoded = decodeToken(authorization);

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
