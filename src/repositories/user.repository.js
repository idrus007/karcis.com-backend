import { prisma } from "../application/database.js";
import { redis } from "../application/redis.js";

const TTL = 600;

export const userRepository = {
  findByEmail: async (email) => {
    const cacheKey = `user:${email}`;
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const user = await prisma.user.findUnique({ where: { email } });
    if (user) await redis.set(cacheKey, JSON.stringify(user), { EX: TTL });
    return user;
  },

  findById: async (id) => {
    const cacheKey = `user-profile:${id}`;
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const user = await prisma.user.findUnique({ where: { id } });
    if (user) await redis.set(cacheKey, JSON.stringify(user), { EX: TTL });
    return user;
  },

  create: (data) => prisma.user.create({ data }),

  update: (id, data) => prisma.user.update({ where: { id }, data }),

  cacheUser: (user) =>
    redis.set(`user:${user.email}`, JSON.stringify(user), { EX: TTL }),

  cacheProfile: (user) =>
    redis.set(`user-profile:${user.id}`, JSON.stringify(user), { EX: TTL }),
};
