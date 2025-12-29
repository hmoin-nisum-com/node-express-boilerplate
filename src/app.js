import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import config from "./config/index.js";
import logger from "./config/logger.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  morgan("combined", { stream: { write: (msg) => logger.info(msg.trim()) } })
);

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.use((err, req, res, next) =>
  res.status(err.status || 500).json({ message: err.message })
);

// Connect Database
if (config.db.type === "mongo") {
  await connectMongo(config.db.mongoUri);
} else {
  await connectPostgres(config.db.postgres);
}

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});

export default app;
