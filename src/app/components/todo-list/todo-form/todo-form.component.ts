import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToDoStatus, ToDoTask } from '../model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService } from '../services';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  public taskEdit: ToDoTask | undefined;
  enumStatusList = Object.keys(ToDoStatus).filter((x) => !(parseInt(x) >= 0));

  todoForm = new FormGroup({
    description: new FormControl('', [Validators.required]),
    status: new FormControl(ToDoStatus.NEW, [Validators.required]),
  });

  constructor(private todoService: TodoService) {}
  ngOnInit(): void {
    this.initSteps();
  }

  initSteps() {
    this.todoService
      .getEditTask()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((task) => {
        if (task) {
          this.taskEdit = task;
          this.todoForm.setValue({
            description: task.description,
            status: task.status,
          });
        } else {
          this.todoForm.reset();
        }
      });
  }

  get taskStatus() {
    return this.todoForm.value.status || 'Select Status';
  }

  submitToDoForm() {
    if (this.todoForm.valid) {
      const formData = this.todoForm.value;
      const task: ToDoTask = {
        description: formData.description as string,
        status: formData.status as ToDoStatus,
        taskId: this.taskEdit?.taskId ?? new Date().getTime(),
      };
      if (!this.taskEdit) {
        this.todoService.addToDoTask(task);
      } else {
        this.taskEdit = undefined;
        this.todoService.editToDoTask(task);
      }
      this.todoForm.reset();
    } else {
      alert('invalid form');
    }
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
