import { FastifyPluginCallback } from "fastify";
import { signup } from "./signup";
import { login } from "./login";

interface MissPasswordProps {
  email: string;
}

export const auth: FastifyPluginCallback = async (fastify, _opts, next) => {
  fastify.post("/signup", signup);
  fastify.post("/login", login);

  fastify.post("/misspassword", async (req, reply) => {
    const { email } = req.body as MissPasswordProps;

    if (email === "") {
      return reply.code(400).send("All fields are required");
    }

    if (!validator.isEmail(email)) {
      return reply.code(400).send("Email is not valid");
    }
    // TODO: crear token con awt
    return reply.send(`mail with instructions was sended`);
  });

  fastify.post("/misspassword", async (req, reply) => {
    const { email } = req.body as MissPasswordProps;

    if (email === "") {
      return reply.code(400).send("All fields are required");
    }

    if (!validator.isEmail(email)) {
      return reply.code(400).send("Email is not valid");
    }
    return reply.send(`mail with instructions was sended`);
  });

  next();
};
