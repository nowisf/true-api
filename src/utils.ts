import { server } from ".";

export const spacesRegex = new RegExp(/\s+/g);

interface TokenContent {
  id: string;
  email: string;
}

export const decodeToken = (token: string) => {
  const decoded = server.jwt.decode(token);

  if (!decoded) {
    throw new Error("Token could not be decoded, please try again");
  }

  return decoded as TokenContent;
};
