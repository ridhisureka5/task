import express from "express";
import protect from "../middleware/auth.middleware.js";
import { updateTask } from "../controllers/task.controller.js";

import {
  getTasks,
  createTask,
  deleteTask,
  toggleTaskStatus,
} from "../controllers/task.controller.js";

const router = express.Router();

router.get("/", protect, getTasks);
router.post("/", protect, createTask);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);
router.patch("/:id/toggle", protect, toggleTaskStatus);



export default router;
