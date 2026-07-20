import mongoose from "mongoose";
import User from "./models/User.js";
import connectDB from "./config/database.js";
import dotenv from "dotenv";

dotenv.config();

async function check() {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    const users = await User.find({});
    console.log(`Found ${users.length} users in database:`);
    
    for (const u of users) {
      const match = await u.comparePassword("password123");
      console.log(`- Email: "${u.email}", Name: "${u.name}", isActive: ${u.isActive}, Password matches "password123": ${match}`);
    }
    
    mongoose.connection.close();
  } catch (error) {
    console.error("Check failed:", error);
  }
}

check();
