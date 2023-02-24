import { FastifyReply, FastifyRequest } from "fastify";
import { server } from "../..";
import { prisma } from "../../database";
import { decodeToken } from "../../utils";

export type TokenHolder = { token: string };

export const authenticated = async function (req: FastifyRequest, reply: FastifyReply) {
  try {
    const { token } = req.body as TokenHolder;

    const tokenIsValid = server.jwt.verify(token);
    if (!tokenIsValid) {
      return reply.code(401).send("Expired Token");
    }

    const decodedToken = decodeToken(token);
    if (!decodedToken) {
      return reply.code(401).send("Invalid Token");
    }

    const { id } = decodedToken;

    const user = prisma.user.findFirst({
      where: { id },
    });
    if (!user) {
      return reply.code(401).send("Invalid credentials");
    }
  } catch (err) {
    reply.send(err);
  }
};
