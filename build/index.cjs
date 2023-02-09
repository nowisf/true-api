'use strict';

const fastify = require('fastify');
const signup = require('./modules/auth/signup.cjs');
const post = require('./modules/post/post.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

const fastify__default = /*#__PURE__*/_interopDefaultLegacy(fastify);

const server = fastify__default["default"]();
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
//# sourceMappingURL=index.cjs.map
