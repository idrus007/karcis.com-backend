import bcrypt from "bcryptjs";

export const hashPassword = (plain) => bcrypt.hash(plain, 12);

export const comparePassword = (plain, hashed) => bcrypt.compare(plain, hashed);
