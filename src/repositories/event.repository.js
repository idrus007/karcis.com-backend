import { prisma } from "../application/database.js";
import { redis } from "../application/redis.js";

const TTL = 600;

export const eventRepository = {
  findById: async (id) => {
    const cacheKey = `event:${id}`;
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const event = await prisma.event.findUnique({
      where: { id },
      include: { tickets: true },
    });

    if (event) {
      await redis.set(cacheKey, JSON.stringify(event), { EX: TTL });
    }

    return event;
  },

  findAll: async () => {
    const cacheKey = `events:all`;
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const events = await prisma.event.findMany();

    if (events.length > 0) {
      await redis.set(cacheKey, JSON.stringify(events), { EX: TTL });
    }

    return events;
  },

  upcoming: async () => {
    const now = new Date();
    const cacheKey = `events:upcoming`;
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const events = await prisma.event.findMany({
      where: {
        date: {
          gte: now,
        },
      },
      orderBy: {
        date: "asc",
      },
      take: 6,
    });

    await redis.set(cacheKey, JSON.stringify(events), { EX: TTL });

    return events;
  },

  create: async (data) => {
    return prisma.event.create({
      data,
      include: { tickets: true },
    });
  },

  update: async (id, data) => {
    const updated = await prisma.event.update({
      where: { id },
      data,
      include: { tickets: true },
    });

    await redis.set(`event:${id}`, JSON.stringify(updated), { EX: TTL });
    return updated;
  },

  delete: async (id) => {
    const deleted = await prisma.event.delete({
      where: { id },
    });

    await redis.del(`event:${id}`);
    return deleted;
  },
};
