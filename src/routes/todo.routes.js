import { Router } from "express";
import {
  createTodo,
  getTodos,
  deleteTodo,
  toggleTodo,
} from "../controllers/todo.controller.js";

const router = Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id", toggleTodo);

export default router;
