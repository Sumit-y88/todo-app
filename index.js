import dotenv from "dotenv";
import app from "./src/app.js";
import {connectDB} from "./src/db/connectDB.js";


dotenv.config();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err);
  });
