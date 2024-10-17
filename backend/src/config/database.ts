import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
// Function to connect to MongoDB
export const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    console.error('Error: MongoDB connection string (MONGO_URI) is missing in environment variables');
    throw new Error('MongoDB connection string (MONGO_URI) is missing in environment variables');
  }
  console.log(mongoURI);
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', (error as Error).message);
    console.error('Stack trace:', (error as Error).stack);
    process.exit(1);  // Exit the process with a failure code
  }
};
