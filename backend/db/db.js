import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB connected to ${mongoose.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectToDatabase;