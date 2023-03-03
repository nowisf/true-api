import { FastifyReply, FastifyRequest } from "fastify";
import { UserCreateProps } from "./types";
import validator from "validator";
import { spacesRegex } from "../../utils/regex";
import bcrypt from "bcrypt";
import { ROUNDS } from "../../env";
import { prisma } from "../../database";

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const { email, password, username, role, active } = req.params as UserCreateProps;

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
      role,
      active,
    },
  });
  return reply.send(user);
}
