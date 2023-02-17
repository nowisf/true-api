import fastify from "fastify";
import { PORT, JWT_SECRET } from "./env";

import { auth } from "./modules/auth";
import { health } from "./modules/health";
import jwt from "@fastify/jwt";
const server = fastify();

server.register(health);
server.register(auth, { prefix: "auth" });

server.register(jwt, {
  secret: JWT_SECRET,
});

server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
