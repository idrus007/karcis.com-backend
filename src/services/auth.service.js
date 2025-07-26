import { userRepository } from "../repositories/user.repository.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/responseHandler.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/token.js";
import { logger } from "../application/logging.js";

export const registerUser = async ({ name, email, password }) => {
  const existing = await userRepository.findByEmail(email);
  if (existing) throw new ApiError(409, "Email sudah terdaftar");

  const hashed = await hashPassword(password);
  const user = new User({ name, email, password: hashed });

  const saved = await userRepository.create(user.toObject());
  await userRepository.cacheUser(saved);

  logger.info(`[REGISTER] User created: ${email}`);
  return user.toSafeObject();
};

export const loginUser = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new ApiError(400, "Email anda belum terdaftar");

  const match = await comparePassword(password, user.password);
  if (!match) throw new ApiError(400, "Email atau password salah");

  logger.info(`[LOGIN] User logged in: ${email}`);
  return {
    user: new User(user).toSafeObject(),
    token: generateToken(user),
  };
};

export const getUserProfile = async (id) => {
  const user = await userRepository.findById(id);
  if (!user) throw new ApiError(404, "User not found");

  logger.info(`[GET] User profile fetched: ${id}`);
  return new User(user).toSafeObject();
};

export const updateUserProfile = async (id, { name, password }) => {
  const update = { name };
  if (password?.trim()) {
    update.password = await hashPassword(password);
  }
  const updated = await userRepository.update(id, update);
  await userRepository.cacheProfile(updated);

  logger.info(`[UPDATE] User profile updated: ${id}`);
  return new User(updated).toSafeObject();
};
