import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("Database connected successfully"));

  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/fullstackrtk`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connection established");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process on failure
  }
};

export default connectDB;