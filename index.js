import dotenv from "dotenv";
import app from "./src/app.js";
import { connectDB } from "./src/db/connectDB.js";

dotenv.config();

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("✅ Server running on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed", err);
  });
