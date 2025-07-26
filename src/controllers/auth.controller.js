import * as authService from "../services/auth.service.js";
import { successResponse } from "../utils/responseHandler.js";
import {
  validateRegisterInput,
  validateLoginInput,
  validateUpdateProfileInput,
} from "../validator/auth.validation.js";

export const registerController = async (req, res, next) => {
  try {
    const validatedInput = validateRegisterInput(req.body);
    const user = await authService.registerUser(validatedInput);

    successResponse(res, "User registered successfully", user, 201);
  } catch (err) {
    next(err);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const validatedInput = validateLoginInput(req.body);

    const { user, token } = await authService.loginUser(validatedInput);

    successResponse(res, "Login berhasil", { user, token });
  } catch (err) {
    next(err);
  }
};

export const getProfileController = async (req, res, next) => {
  try {
    const user = await authService.getUserProfile(req.user.id);
    successResponse(res, "User profile", user);
  } catch (err) {
    next(err);
  }
};

export const updateProfileController = async (req, res, next) => {
  try {
    validateUpdateProfileInput(req.body);

    const user = await authService.updateUserProfile(req.user.id, req.body);
    successResponse(res, "User profile updated", user);
  } catch (err) {
    next(err);
  }
};
