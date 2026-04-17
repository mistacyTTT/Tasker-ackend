import { Request, Response } from "express";
import { createTaskService, getTasksService } from "../services/task.service";
import { TaskInput } from "../interfaces/task.interface";

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: number = (req as any).user.id;
    const input: TaskInput = req.body;
    const result = await createTaskService(userId, input);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: number = (req as any).user.id;
    const result = await getTasksService(userId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};