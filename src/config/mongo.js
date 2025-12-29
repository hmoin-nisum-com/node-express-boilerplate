import mongoose from 'mongoose';
import dotenv from 'dotenv';
import config from "./index.js";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(config.db.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;