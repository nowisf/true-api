import { UserRole } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../database";
import { decodeToken } from "../utils/token";
import { TokenHolder } from "./types";

export async function requireAdmin(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { token } = req.headers as TokenHolder;

    const decoded = decodeToken(token);

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
