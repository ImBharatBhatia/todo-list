import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from '../services';
import { ToDoTask } from '../model';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  toDoList: ToDoTask[] = [];

  constructor(public todoService: TodoService) {}
  ngOnInit(): void {
    this.todoService.toDoList$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((list) => {
        this.toDoList = list;
      });
  }

  editTask(task: ToDoTask) {
    if (!task.inEditMode) {
      this.toDoList.forEach((task) => (task.inEditMode = false));
      task.inEditMode = true;
      this.todoService.setEditTask(task);
    } else {
      task.inEditMode = false;
      this.todoService.setEditTask(null);
    }
  }

  deleteTaskConfirmation(task: ToDoTask) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.deleteTask(task);
    }
  }

  private deleteTask(task: ToDoTask) {
    this.todoService.deleteTask(task.taskId);
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
