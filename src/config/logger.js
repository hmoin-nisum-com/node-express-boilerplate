import { createLogger, transports, format } from "winston";
import config from "./index.js";

const logger = createLogger({
  level: config.logLevel,
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console()],
});

export default logger;
