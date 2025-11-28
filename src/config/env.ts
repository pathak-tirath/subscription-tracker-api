import { IEnv } from "@/types/type";
import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "development"}` });

export const {
  PORT,
  NODE_ENV,
  MONGO_URI,
  LOGGER_LEVEL,
  SALT,
  JWT_SECRET,
  JWT_EXPIRE,
  ARCJET_KEY,
} = process.env as IEnv;
