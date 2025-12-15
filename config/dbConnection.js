import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, clientOptions);
    console.log("🚀 MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
