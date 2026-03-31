import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: process.env.SERVERSELECTIONTIMEOUT,
      family: process.env.FAMILY,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default connectToDatabase;