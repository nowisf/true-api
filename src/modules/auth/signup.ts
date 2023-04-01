import validator from "validator";
import { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from "bcrypt";
import { prisma } from "../../database";
import { ROUNDS } from "../../env";
import { spacesRegex } from "../../utils/regex";
import { SignupRequest } from "./types";

export async function signup(req: SignupRequest, reply: FastifyReply) {
  const { email, password, username } = req.body;

  if (email === "" || password === "" || username === "") {
    return reply.code(400).send({ error: "All fields are required" });
  }

  if (!validator.isEmail(email)) {
    return reply.code(400).send({ error: "Email is not valid" });
  }

  if (spacesRegex.test(username)) {
    return reply.code(400).send({ error: "Spaces are not allowed in username field" });
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

  return reply.send({ data: `User with id ${user.id} has been created` });
}
