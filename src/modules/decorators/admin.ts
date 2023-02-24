import { FastifyReply, FastifyRequest } from "fastify";
import { server } from "../..";
import { prisma } from "../../database";
import { decodeToken } from "../../utils";

export type TokenHolder = { token: string };

export const admin = async function (req: FastifyRequest, reply: FastifyReply) {
  try {
    const { token } = req.body as TokenHolder;

    const isValid = server.jwt.verify(token);
    if (!isValid) {
      return reply.code(401).send("Expired Token");
    }

    const decoded = decodeToken(token);
    if (!decoded) {
      return reply.code(401).send("Invalid Token");
    }

    const { id } = decoded;
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return reply.code(401).send("Unathorized user");
    }

    if (user.role != "ADMIN") {
      return reply.code(401).send("Unathorized user");
    }
  } catch (err) {
    reply.send(err);
  }
};
