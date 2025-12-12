import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 8080,
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/boilerplate",
  jwtSecret: process.env.JWT_SECRET || "your_jwt_secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "15m",
  refreshTokenExpiresInDays: Number(process.env.REFRESH_EXPIRES_DAYS) || 7,
  logLevel: process.env.LOG_LEVEL || "info",
};

export default config;
