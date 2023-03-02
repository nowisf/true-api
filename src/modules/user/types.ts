import { UserRole } from "@prisma/client";

export interface UserUpdateProps {
  password?: string;
  role?: UserRole;
  active?: boolean;
}
