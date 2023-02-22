import validator from "validator";
import { FastifyReply, FastifyRequest } from "fastify";
import { spacesRegex } from "../../utils";
import bcrypt from "bcrypt";
import { prisma } from "../../database";
import { ROUNDS } from "../../constants";

export interface SignupProps {
  username: string;
  email: string;
  password: string;
}

export const signup = async (req: FastifyRequest, reply: FastifyReply) => {
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

  // TODO: Enviar correo de confirmación de cuenta

  return reply.send(`User with id ${user.id} has been created`);
};
