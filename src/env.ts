import { dirname, resolve } from "path";

import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config({
  path: resolve(dirname(fileURLToPath(import.meta.url)), "../.env"),
});

export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
//TODO: en lugar de devolver secret missing reintentar o de lleno no arrancar el servidor hasta solucionarlo
export const JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : "secret missing";
