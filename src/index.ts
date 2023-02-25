import fastify from "fastify";
import { PORT, JWT_SECRET } from "./env";

import { auth } from "./modules/auth";
import { health } from "./modules/health";
import jwt from "@fastify/jwt";
import { authDecorator } from "./decorators";
import fastifyPlugin from "fastify-plugin";

export const server = fastify();

// routes
server.register(health);
server.register(auth, { prefix: "auth" });
server.register(jwt, {
  secret: JWT_SECRET,
});

// decorators
server.register(fastifyPlugin(authDecorator, { name: "auth" }));

server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
