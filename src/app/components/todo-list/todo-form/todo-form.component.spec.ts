import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFormComponent } from './todo-form.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoService } from '../services';
import { BehaviorSubject, of } from 'rxjs';
import { ToDoStatus, ToDoTask } from '../model';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoFormComponent, TodoListComponent],
      imports: [ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initSteps', () => {
    const description = 'test';
    const task: ToDoTask = {
      description: description,
      status: ToDoStatus.COMPLETED,
      taskId: 1,
    };
    const task$ = new BehaviorSubject<ToDoTask | null>(task);
    spyOn(TodoService.prototype, 'getEditTask').and.returnValue(task$);

    component.initSteps();

    expect(component.taskEdit?.description).toBe(description);
  });

  it('taskStatus', () => {
    expect(component.taskStatus).toBe('Select Status');

    component.todoForm.setValue({
      description: '',
      status: ToDoStatus.IN_PROGRESS,
    });
    expect(component.taskStatus).toBe(ToDoStatus.IN_PROGRESS);
  });

  it('submitToDoForm, invalid Case', () => {
    let alertTrigger = false;
    spyOn(window, 'alert').and.callFake(function () {
      alertTrigger = true;
    });
    component.submitToDoForm();

    expect(alertTrigger).toBe(true);
  });

  it('submitToDoForm, new mode', () => {
    const spy = spyOn(TodoService.prototype, 'addToDoTask');
    component.todoForm.setValue({
      description: 'TEST TASK',
      status: ToDoStatus.IN_PROGRESS,
    });

    component.submitToDoForm();

    expect(spy).toHaveBeenCalled();
  });

  it('submitToDoForm, edit mode', () => {
    const spy = spyOn(TodoService.prototype, 'editToDoTask');
    component.taskEdit = {
      description: '',
      status: ToDoStatus.COMPLETED,
      taskId: 1,
    };
    component.todoForm.setValue({
      description: 'TEST TASK',
      status: ToDoStatus.IN_PROGRESS,
    });

    component.submitToDoForm();

    expect(spy).toHaveBeenCalled();
    expect(component.taskEdit).toBeUndefined();
  });
});
