import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function signup(fastify: any, options: any) {
  fastify.get(
    "/post",
    async (request: any, reply: { send: (arg0: { mensaje: string }) => void }) => {
      console.log("se solicitaron los post");
      const posts = await prisma.user.findMany();
      console.log(`post: ${posts}`);
      reply.send(posts);
    },
  );
  fastify.get(
    "/post/{id}",
    (request: any, reply: { send: (arg0: { mensaje: string }) => void }) => {
      console.log("se solicitaro un post");

      console.log();
      reply.send({
        mensaje: "test",
      });
    },
  );
  fastify.post(
    "/post",
    async (request: any, reply: { send: (arg0: { mensaje: string }) => void }) => {
      console.log("se creo un post");

      console.log(request.params);
      console.log(request.body);
      console.log(request.query);
      const newPost = await prisma.post.create({
        data: {
          content: "test",
          userId: "test",
          user: "test",
        },
      });
      reply.send({
        mensaje: "test",
      });
    },
  );
}
