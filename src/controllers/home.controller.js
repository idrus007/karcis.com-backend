import * as homeService from "../services/home.service.js";
import { successResponse } from "../utils/responseHandler.js";

export const HomeController = async (req, res, next) => {
  try {
    const data = await homeService.getEventsHome();
    successResponse(res, "Data retrieved successfully", data);
  } catch (err) {
    next(err);
  }
};
