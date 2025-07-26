import { eventRepository } from "../repositories/event.repository.js";
import { Event } from "../models/event.model.js";
import { logger } from "../application/logging.js";
import { ApiError } from "../utils/responseHandler.js";

/**
 * Event Service
 * Handles business logic for event management
 */
export const createEvent = async ({
  name,
  description,
  location,
  date,
  image,
  tickets,
}) => {
  const event = new Event({
    name,
    description,
    location,
    date,
    image,
    tickets,
  });

  const saved = await eventRepository.create(event.toPrismaCreateInput());

  logger.info(`[CREATE] Event created: ${saved.name} (${saved.id})`);

  return new Event(saved).toObject();
};

export const getAllEvents = async () => {
  const events = await eventRepository.findAll();

  logger.info(`[GET ALL] Retrieved ${events.length} events`);

  return events.map((event) => new Event(event).toObjectWithoutTickets());
};

export const getEventById = async (id) => {
  const event = await eventRepository.findById(id);

  if (!event) {
    logger.warn(`[GET BY ID] Event not found: ${id}`);
    throw new ApiError(404, "Event not found");
  }

  logger.info(`[GET BY ID] Retrieved event: ${event.name} (${event.id})`);

  return new Event(event).toObject();
};
