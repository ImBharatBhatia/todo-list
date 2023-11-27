import { ToDoStatus } from '.';

export interface ToDoTask {
  taskId: number;
  description: string;
  status: ToDoStatus;
  inEditMode?: boolean;
}
