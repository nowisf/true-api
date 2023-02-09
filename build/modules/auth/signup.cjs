'use strict';

const client = require('@prisma/client');

new client.PrismaClient();
async function signup(fastify, options) {
  fastify.get("/signup", (request, reply) => {
    reply.send({
      mensaje: "test"
    });
  });
}

module.exports = signup;
//# sourceMappingURL=signup.cjs.map
