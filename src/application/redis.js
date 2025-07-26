import dotenv from "dotenv";
import { createClient } from "redis";
import { logger } from "./logging.js";

dotenv.config();

const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.on("connect", () => {
  logger.info("Redis connected");
});

redis.on("error", (err) => {
  logger.error(err);
  logger.error("Failed to connect Redis");
  process.exit(1);
});

const connectRedis = async () => {
  if (!redis.isOpen) {
    await redis.connect();
  }
};

export { redis, connectRedis };
