import { BaseResponse } from "./auth.interface";


export interface TaskInput {
    title: string;
    description?: string;
    day?: string;
    priority?: string;
    tags?: string[];
    assignee?: string;
    notify?: string;
}


export interface TaskData {
    id: number;
    title: string;
    description?: string | null;
    day?: string | null;
    priority?: string | null;
    tags: string[];
    assignee?: string | null;
    notify?: string | null;
    done: boolean;
    createdAt: Date;
    userId: number;
}


export interface TaskResponse extends BaseResponse {
    data?: TaskData;
}

export interface TasksResponse extends BaseResponse {
    data?: TaskData[];
}
