import { PrismaClient } from "@prisma/client";
import { logger } from "./logging.js";

const globalForPrisma = globalThis;

const prisma =
  globalForPrisma.__prisma ??
  new PrismaClient({
    log: [
      {
        emit: "event",
        level: "query",
      },
      {
        emit: "event",
        level: "error",
      },
      {
        emit: "event",
        level: "info",
      },
      {
        emit: "event",
        level: "warn",
      },
    ],
  });

prisma.$on("error", (e) => {
  logger.error(`[PRISMA ERROR] ${e.message}`);
});

prisma.$on("warn", (e) => {
  logger.warn(`[PRISMA WARN] ${e.message}`);
});

prisma.$on("info", (e) => {
  logger.info(`[PRISMA INFO] ${e.message}`);
});

prisma.$on("query", (e) => {
  logger.info(`[PRISMA QUERY] ${e.query} | ${e.params} | ${e.duration}ms`);
});

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV !== "production";

if (isDev) {
  globalForPrisma.__prisma = prisma;
}

export async function connectDB() {
  try {
    await prisma.$connect();
    logger.info("Database connected");
  } catch (err) {
    logger.error("Failed to connect DB:", err);
    process.exit(1);
  }
}

export { prisma };
