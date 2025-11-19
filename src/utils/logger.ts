import winston from "winston";
const {combine, colorize, printf,timestamp} = winston.format
import { NODE_ENV,LOGGER_LEVEL } from "@/config/env";

const logger = winston.createLogger({
  level: LOGGER_LEVEL || "info",
  defaultMeta: { service: "user-service" },
  format: combine(
    colorize({all:true}),
    timestamp({
        format:"YYYY-MM-DD hh:mm:ss.SSS A"
    }),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
