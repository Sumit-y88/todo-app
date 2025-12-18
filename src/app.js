import express from "express";
import todoRoutes from "./routes/todo.routes.js";
import errorHandler from "./middlewares/error.middleware.js";


const app = express();

app.use(express.json());
app.use(express.static("public")); // serve frontend

app.use("/api/todos", todoRoutes);
app.use(errorHandler);

export default app;
