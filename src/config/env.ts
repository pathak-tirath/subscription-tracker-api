import { config } from "dotenv";
import { z } from "zod";
config({ path: `.env.${process.env.NODE_ENV || "development"}` });

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  MONGO_URI: z.string().min(1),
  LOGGER_LEVEL: z.string().default("info"),
  SALT: z.string().optional(),
  JWT_SECRET: z.string().min(1),
  JWT_EXPIRE: z.string().min(1).default("1d"),
  ARCJET_KEY: z.string().min(1),
});

const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
  throw new Error(`Invalid environment configuration: ${parsedEnv.error.message}`);
}

export const { PORT, NODE_ENV, MONGO_URI, LOGGER_LEVEL, SALT, JWT_SECRET, JWT_EXPIRE, ARCJET_KEY } = parsedEnv.data;
