import { eventRepository } from "../repositories/event.repository.js";
import { Event } from "../models/event.model.js";
import { logger } from "../application/logging.js";

export const getEventsHome = async () => {
  const allEvents = await eventRepository.findAll();
  const shuffled = allEvents.sort(() => 0.5 - Math.random());
  const unggulan = shuffled.slice(0, 6);

  const akanDatang = await eventRepository.upcoming();

  logger.info(
    `[GET EVENTS] ${unggulan.length} unggulan & ${akanDatang.length} akan datang`
  );

  return {
    unggulan: unggulan.map((event) =>
      new Event(event).toObjectWithoutTickets()
    ),
    akanDatang: akanDatang.map((event) =>
      new Event(event).toObjectWithoutTickets()
    ),
  };
};
