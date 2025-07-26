import { logger } from "../application/logging.js";
import { ApiError } from "../utils/responseHandler.js";
import multer from "multer";

export const errorMiddleware = (err, req, res, _next) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof multer.MulterError) {
    statusCode = 400;
    if (err.code === "LIMIT_FILE_SIZE") {
      message = "File size too large (maximum 2MB)";
    } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
      message = "Invalid file type (only .jpg, .jpeg, .png, .webp allowed)";
    } else {
      message = err.message;
    }
  } else {
    logger.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
