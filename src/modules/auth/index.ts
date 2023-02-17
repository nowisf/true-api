import { FastifyPluginCallback } from "fastify";
import validator from "validator";
import { prisma } from "../../database";
import bcrypt from "bcrypt";
import { spacesRegex } from "../../utils";

const ROUNDS = 10;

interface SignupProps {
  username: string;
  email: string;
  password: string;
}

interface LoginProps {
  usernameOrEmail: string;
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

    if (spacesRegex.test(username)) {
      return reply.code(400).send("Spaces are not allowed in username field");
    }

    const encryptedPassword = await bcrypt.hash(password.trim(), ROUNDS);

    const user = await prisma.user.create({
      data: {
        email: email.trim().toLowerCase(),
        username: username.trim(),
        password: encryptedPassword,
      },
    });

    return reply.send(`User with id ${user.id} has been created`);
  });

  fastify.post("/login", async (req, reply) => {
    const { usernameOrEmail, password } = req.body as LoginProps;

    if (usernameOrEmail === "" || password === "") {
      return reply.code(400).send("All fields are required");
    }

    const user = await prisma.user.findFirst({
      where: { OR: [{ username: usernameOrEmail }, { email: usernameOrEmail.toLowerCase() }] },
    });
    if (!user) {
      return reply.code(404).send("User not found");
    }

    const passwordsAreEqual = await bcrypt.compare(password, user.password);
    if (!passwordsAreEqual) {
      return reply.code(401).send("Incorrect User or Password");
    }

    const token = fastify.jwt.sign({ id: user.id, email: user.email });
    return reply.send(token);
  });

  next();
};
