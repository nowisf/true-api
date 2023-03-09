import { FastifyRequest } from "fastify";

export type ForgotPasswordRequest = FastifyRequest<{
  Body:
    | {
        token: string;
        password: string;
      }
    | {
        email: string;
      };
}>;

export type LoginRequest = FastifyRequest<{
  Body: {
    usernameOrEmail: string;
    password: string;
  };
}>;

export type SignupRequest = FastifyRequest<{
  Body: {
    username: string;
    email: string;
    password: string;
  };
}>;
