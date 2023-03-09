import { UserRole } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../database";
import { decodeToken } from "../utils/token";
import { AuthHolder } from "./types";

export async function requireAdmin(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { authotization } = req.headers as AuthHolder;

    const decoded = decodeToken(authotization);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { role: true },
    });

    if (user?.role !== UserRole.ADMIN) {
      return reply.code(401).send("Unathorized user");
    }
  } catch (err) {
    reply.send(err);
  }
}
