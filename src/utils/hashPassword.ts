import bcrypt from "bcrypt";

export const hashPassword = (password: string): Promise<string> =>
  bcrypt.hash(password, 10);
