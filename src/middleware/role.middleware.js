import { ApiError } from "../utils/responseHandler.js";

export const checkRole = (allowedRoles = []) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return next(new ApiError(401, "Unauthorized: Role not found"));
    }

    if (!allowedRoles.includes(userRole)) {
      return next(
        new ApiError(
          403,
          "Access denied: You don't have permission for this resource!"
        )
      );
    }

    next();
  };
};
