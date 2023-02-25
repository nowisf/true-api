import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../database";
import { decodeToken } from "../utils/token";
import { TokenHolder } from "./types";

export async function authenticated(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { token } = req.body as TokenHolder;

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
