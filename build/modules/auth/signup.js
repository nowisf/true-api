import { PrismaClient } from '@prisma/client';

new PrismaClient();
async function signup(fastify, options) {
  fastify.get("/signup", (request, reply) => {
    reply.send({
      mensaje: "test"
    });
  });
}

export { signup as default };
//# sourceMappingURL=signup.js.map
