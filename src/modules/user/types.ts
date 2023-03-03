import { UserRole } from "@prisma/client";

export interface UserUpdateProps {
  password?: string;
  role?: UserRole;
  active?: boolean;
}

export interface RequestParams {
  id: string;
}

export interface UserCreateProps {
  username: string;
  email: string;
  password: string;
  role?: UserRole;
  active?: boolean;
}
