import { z } from "zod";
import { ApiError } from "../utils/responseHandler.js";

const handleValidation = (schema, data) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const message =
      Array.isArray(result.error.issues) && result.error.issues.length > 0
        ? result.error.issues[0].message
        : "Invalid input";

    throw new ApiError(400, message);
  }

  return result.data;
};

export const validateRegisterInput = (data) => {
  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });
  return handleValidation(schema, data);
};

export const validateLoginInput = (data) => {
  const schema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(1, "Password is required"),
  });
  return handleValidation(schema, data);
};

export const validateUpdateProfileInput = (data) => {
  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional()
      .or(z.literal("")),
  });
  return handleValidation(schema, data);
};
