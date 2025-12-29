import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 8080,
  db: {
    type: process.env.DB_TYPE || "mongo",
    mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/boilerplate",
    postgres: {
      host: process.env.PG_HOST,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      port: Number(process.env.PG_PORT || 5432),
    },
  },
  jwt:{
    secret: process.env.JWT_SECRET || "your_jwt_secret",
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
    refreshDays: Number(process.env.REFRESH_EXPIRES_DAYS) || 7,
    saltRounds: Number(process.env.SALT_ROUNDS) || 10,
  },
  logLevel: process.env.LOG_LEVEL || "info",
};

export default config;
