import { SALT } from "@/config/env";
import bcrypt from "bcrypt";
import logger from "@/utils/logger";

export const hashPassword = async (password: string) => {
  bcrypt.hash(password, SALT as string, (err, hash) => {
    if (err) {
      logger.error("Error hashing the password");
    }
    return hash;
  });
};
