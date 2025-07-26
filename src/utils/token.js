import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const secret = process.env.SECRET_KEY;

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    secret,
    { expiresIn: "3d" }
  );
};
