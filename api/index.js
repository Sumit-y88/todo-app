import dotenv from "dotenv";
import app from "../src/app.js";
import { connectDB } from "../src/db/connectDB.js";

dotenv.config();

let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
    console.log("✅ MongoDB connected (Vercel)");
  }

  return app(req, res);
}
