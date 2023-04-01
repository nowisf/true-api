import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { JWT_SECRET } from "./env";
import { auth } from "./modules/auth";
import { user } from "./modules/user";
import cors from "@fastify/cors";

export const server = fastify();

// routes
server.register(auth, { prefix: "/api/auth" });
server.register(user, { prefix: "/api/user" });

// plugins
server.register(fastifyJwt, {
  secret: JWT_SECRET,
});

server.register(cors, {
  origin: "*",
});
