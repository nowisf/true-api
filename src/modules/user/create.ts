import { FastifyReply, FastifyRequest } from "fastify";
import validator from "validator";
import { spacesRegex } from "../../utils/regex";
import bcrypt from "bcrypt";
import { ROUNDS } from "../../env";
import { prisma } from "../../database";
import { CreateUserRequest } from "./types";

export async function create(req: CreateUserRequest, reply: FastifyReply) {
  const { email, password, username, role, active } = req.body;

  if (email === "" || password === "" || username === "") {
    return reply.code(400).send("Please fill required fields");
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

  return reply.send({ user });
}
