import { UserRole } from "@prisma/client";
import { FastifyRequest } from "fastify";

export type UpdateUserRequest = FastifyRequest<{
  Params: {
    id: string;
  };
  Body: {
    password?: string;
    role?: UserRole;
    active?: boolean;
  };
}>;

export type DeleteUserRequest = FastifyRequest<{
  Params: {
    id: string;
  };
}>;

export type CreateUserRequest = FastifyRequest<{
  Body: {
    username: string;
    email: string;
    password: string;
    role?: UserRole;
    active?: boolean;
  };
}>;
