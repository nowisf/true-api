import { dirname, resolve } from "path";

import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config({
  path: resolve(dirname(fileURLToPath(import.meta.url)), "../.env"),
});

export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
export const JWT_SECRET = process.env.JWT_SECRET || "";
export const ROUNDS = process.env.ROUNDS ? parseInt(process.env.ROUNDS) : 8;
//TODO: reemplazar defaults, el servidor no debe arrancar si la fuente de envs falla
