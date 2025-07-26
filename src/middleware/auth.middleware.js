import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/responseHandler.js";

dotenv.config();
const secret_key = process.env.SECRET_KEY;

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "Access denied. No token provided.");
    }

    jwt.verify(token, secret_key, (err, decoded) => {
      if (err) {
        throw new ApiError(403, "Invalid or expired token.");
      }

      req.user = decoded;
      next();
    });
  } catch (err) {
    next(err);
  }
};
