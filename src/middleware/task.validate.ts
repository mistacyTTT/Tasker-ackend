import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const createTaskSchema = z.object({
  title: z.string().min(1, "Task title is required."),
  description: z.string().optional(),
  day: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  tags: z.array(z.string()).optional(),
  assignee: z.string().optional(),
  notify: z.string().optional(),
});

export const validateCreateTask = (req: Request, res: Response, next: NextFunction): void => {
  const result = createTaskSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      success: false,
      message: result.error.issues[0].message,
    });
    return;
  }

  req.body = result.data;
  next();
};