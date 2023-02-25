import { server } from "../fastify";

interface TokenContent {
  id: string;
  email: string;
}

export const decodeToken = (token: string) => {
  const isValid = server.jwt.verify(token);

  if (!isValid) {
    throw new Error("Token expired");
  }

  const decoded = server.jwt.decode(token);

  if (!decoded) {
    throw new Error("Token could not be decoded, please try again");
  }

  return decoded as TokenContent;
};
