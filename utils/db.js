import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Agar pehle se connected hai toh wapas connect mat or
    if (mongoose.connections[0].readyState) {
      return;
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

export default connectDB;
