import mongoose from "mongoose";
import dns from "node:dns";

// Use Google Public DNS to bypass local DNS servers that fail to resolve SRV records
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (err) {
  console.warn("Could not set custom DNS servers:", err.message);
}

export async function connectDB() {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI is required");
    }

    const conn = await mongoose.connect(mongoUri);

    console.log("MongoDB connected:", conn.connection.host);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
}