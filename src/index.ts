import { PORT } from "./env";
import { server } from "./fastify";

server.listen({ host: "0.0.0.0", port: PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
