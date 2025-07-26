import * as eventService from "../services/event.service.js";
import { successResponse } from "../utils/responseHandler.js";
import { validateCreateEventInput } from "../validator/event.vaildation.js";

export const createEventController = async (req, res, next) => {
  try {
    const validatedInput = validateCreateEventInput(req.body);
    const event = await eventService.createEvent(validatedInput);

    successResponse(res, "Event created successfully", event, 201);
  } catch (err) {
    next(err);
  }
};

export const getAllEventsController = async (req, res, next) => {
  try {
    const events = await eventService.getAllEvents();
    successResponse(res, "Events retrieved successfully", events);
  } catch (err) {
    next(err);
  }
};

export const getEventByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await eventService.getEventById(id);
    successResponse(res, "Event details retrieved successfully", event);
  } catch (err) {
    next(err);
  }
};
