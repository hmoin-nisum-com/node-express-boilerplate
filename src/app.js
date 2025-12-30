import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import healthRoutes from "./routes/health.routes.js";
import config from "./config/index.js";
import logger from "./config/logger.js";
import connectMongo from "./config/mongo.js";
import { requestId } from "./middleware/requestId.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestId());

morgan.token("requestId", (req) => req.requestId);
app.use(
  morgan(":requestId :method :url :status - :response-time ms", {
    stream: { write: (msg) => logger.info(msg.trim()) },
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/health", healthRoutes);

app.use((err, req, res, next) =>
  res.status(err.status || 500).json({
    message: err.message,
    requestId: req.requestId,
  })
);

// Connect Database
if (config.db.type === "mongo") {
  await connectMongo(config.db.mongoUri);
} else {
  // Lazy import so Mongo users don't need the optional `pg` dependency installed.
  const { default: connectPostgres } = await import("./config/postgres.js");
  await connectPostgres();
}

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});

export default app;
