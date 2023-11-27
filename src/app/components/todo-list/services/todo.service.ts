import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ToDoTask } from '../model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  toDoList$ = new BehaviorSubject<ToDoTask[]>([]);
  private taskToEdit$ = new BehaviorSubject<ToDoTask | null>(null);
  constructor() {}

  addToDoTask(task: ToDoTask) {
    this.toDoList$.next(this.toDoList$.getValue().concat([task]));
  }

  editToDoTask(task: ToDoTask) {
    const currentTasks = this.toDoList$.getValue();
    currentTasks[currentTasks.findIndex((o) => o.taskId === task.taskId)] =
      task;

    this.toDoList$.next(currentTasks);
  }

  setEditTask(task: ToDoTask | null) {
    this.taskToEdit$.next(task);
  }
  getEditTask() {
    return this.taskToEdit$;
  }

  deleteTask(taskId: number) {
    this.toDoList$.next(
      this.toDoList$.getValue().filter((task) => task.taskId !== taskId)
    );
  }
}
