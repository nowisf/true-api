import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import fastifyPlugin from "fastify-plugin";
import { authDecorator } from "./decorators";
import { JWT_SECRET } from "./env";
import { auth } from "./modules/auth";
import { health } from "./modules/health";

export const server = fastify();

// routes
server.register(health);
server.register(auth, { prefix: "auth" });
server.register(fastifyJwt, {
  secret: JWT_SECRET,
});

// decorators
server.register(fastifyPlugin(authDecorator, { name: "auth" }));
