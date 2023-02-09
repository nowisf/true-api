import jwt from "jose";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function signup(fastify: any, options: any) {
  fastify.get("/signup", (request: any, reply: { send: (arg0: { mensaje: string }) => void }) => {
    reply.send({
      mensaje: "test",
    });
  });
}
