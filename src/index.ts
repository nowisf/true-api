import fastify from "fastify";

import signup from "./modules/auth/signup";
import post from "./modules/post/post";
const server = fastify();

server.register(signup, post);

server.get("/ping", async (request, reply) => {
  return "pong\n";
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
