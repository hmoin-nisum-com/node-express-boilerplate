import mongoose from 'mongoose';
import config from "./index.js";

const connectMongo = async (mongoUri = config.db.mongoUri) => {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectMongo;