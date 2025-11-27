import mongoose from "mongoose";

export const connectDatabase = async (): Promise<void> => {
  try {

    // Retrieve MongoDB connection string from environment variables
    const mongoURI = process.env["MONGODB_URL"];
    // Check if the connection string is defined
    if (!mongoURI) {
      throw new Error("MONGODB_URL is not defined in environment variables");
    }
 // Connect to MongoDB using Mongoose
    await mongoose.connect(mongoURI);

    // 
    process.on("SIGINT ", async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  } catch (error) {
    throw new Error(`Database connection failed: ${error}`);
  }
};

// Function to disconnect from the database
export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
  } catch (error) {
    throw new Error(`Database disconnection failed: ${error}`);
  }
};
