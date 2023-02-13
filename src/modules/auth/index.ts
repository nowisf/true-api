import { FastifyPluginCallback } from "fastify";
import validator from "validator";
import { prisma } from "../../database";
import bcrypt from "bcrypt";

const ROUNDS = 10;

interface SignupProps {
  username: string;
  email: string;
  password: string;
}

export const auth: FastifyPluginCallback = async (fastify, _opts, next) => {
  fastify.post("/signup", async (req, reply) => {
    const { email, password, username } = req.body as SignupProps;

    if (email === "" || password === "" || username === "") {
      return reply.code(400).send("All fields are required");
    }

    if (!validator.isEmail(email)) {
      return reply.code(400).send("Email is not valid");
    }

    const encryptedPassword = await bcrypt.hash(password.trim(), ROUNDS);

    const user = await prisma.user.create({
      data: {
        email: email.trim().toLowerCase(),
        username: username.trim(),
        password: encryptedPassword,
      },
    });

    // TODO: Enviar correo de confirmación de cuenta

    return reply.send(`User with id ${user.id} has been created`);
  });

  next();
};
