import dotenv from "dotenv";
dotenv.config();

import app from "./application/app.js";
import { logger } from "../src/application/logging.js";
import { connectDB } from "../src/application/database.js";
import { connectRedis } from "../src/application/redis.js";

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await connectDB();
    await connectRedis();

    app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
