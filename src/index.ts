import fastify from "fastify";
import { PORT } from "./env";

import { auth } from "./modules/auth";
import { health } from "./modules/health";

const server = fastify();

server.register(health);
server.register(auth, { prefix: "auth" });

server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
