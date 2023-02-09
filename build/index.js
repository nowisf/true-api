import fastify from 'fastify';
import signup from './modules/auth/signup.js';
import signup$1 from './modules/post/post.js';

const server = fastify();
server.register(signup, signup$1);
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
//# sourceMappingURL=index.js.map
