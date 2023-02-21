import { dirname, resolve } from "path";

import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config({
  path: resolve(dirname(fileURLToPath(import.meta.url)), "../.env"),
});

export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
export const JWT_SECRET = process.env.JWT_SECRET || "";
//TODO: XD
export const ROUNDS = 10;
