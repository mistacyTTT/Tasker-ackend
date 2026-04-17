import { Router } from "express";
import { createTask, getTasks } from "../controllers/task.controller";
import { verifyToken } from "../middleware/auth.middleware";
import { validateCreateTask } from "../middleware/task.validate";

const router = Router();

router.post("/", verifyToken, validateCreateTask, createTask);
router.get("/", verifyToken, getTasks);

export default router;