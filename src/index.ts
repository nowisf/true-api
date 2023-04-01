import { PORT } from "./env";
import { server } from "./fastify";
// @ts-expect-error no types
import vault from "dotenv-vault-core";
vault.config();

server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
