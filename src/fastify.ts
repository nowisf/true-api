import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { JWT_SECRET } from "./env";
import { auth } from "./modules/auth";
import { health } from "./modules/health";
import { user } from "./modules/user";

export const server = fastify();

// routes
server.register(health);
server.register(auth);
server.register(user);

// plugins
server.register(fastifyJwt, {
  secret: JWT_SECRET,
});
