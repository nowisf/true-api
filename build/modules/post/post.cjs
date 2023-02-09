'use strict';

const client = require('@prisma/client');

const prisma = new client.PrismaClient();
async function signup(fastify, options) {
  fastify.get(
    "/post",
    async (request, reply) => {
      console.log("se solicitaron los post");
      const posts = await prisma.user.findMany();
      console.log(`post: ${posts}`);
      reply.send(posts);
    }
  );
  fastify.get(
    "/post/{id}",
    (request, reply) => {
      console.log("se solicitaro un post");
      console.log();
      reply.send({
        mensaje: "test"
      });
    }
  );
  fastify.post(
    "/post",
    async (request, reply) => {
      console.log("se creo un post");
      console.log(request.params);
      console.log(request.body);
      console.log(request.query);
      await prisma.post.create({
        data: {
          content: "test",
          userId: "test",
          user: "test"
        }
      });
      reply.send({
        mensaje: "test"
      });
    }
  );
}

module.exports = signup;
//# sourceMappingURL=post.cjs.map
