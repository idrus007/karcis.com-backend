import winston from "winston";

const { combine, timestamp, printf, colorize, json } = winston.format;

const devFormat = combine(
  colorize(),
  timestamp(),
  printf(({ level, message, timestamp }) => {
    const msg =
      typeof message === "object" ? JSON.stringify(message, null, 2) : message;
    return `[${timestamp}] ${level}: ${msg}`;
  })
);

const prodFormat = combine(timestamp(), json());

export const logger = winston.createLogger({
  level: "info",
  format: process.env.NODE_ENV === "production" ? prodFormat : devFormat,
  transports: [new winston.transports.Console()],
});
