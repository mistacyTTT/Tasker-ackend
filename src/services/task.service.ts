import { prisma } from "../db/prisma";
import { TaskInput, TaskResponse, TasksResponse } from "../interfaces/task.interface";

export const createTaskService = async (
  userId: number,
  data: TaskInput
): Promise<TaskResponse> => {
  const task = await prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      day: data.day,
      priority: data.priority,
      tags: data.tags ?? [],
      assignee: data.assignee,
      notify: data.notify,
      userId,
    },
  });

  return {
    success: true,
    message: "Task created successfully.",
    data: task,
  };
};

export const getTasksService = async (userId: number): Promise<TasksResponse> => {
  const tasks = await prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return {
    success: true,
    message: "Tasks fetched successfully.",
    data: tasks,
  };
};