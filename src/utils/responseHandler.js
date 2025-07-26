export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const successResponse = (res, message, data = null, code = 200) => {
  return res.status(code).json({
    success: true,
    message,
    data,
  });
};
