import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { ToDoStatus } from '../model';
import { TodoService } from '../services';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent],
    });
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('editTask, non edit mode', () => {
    component.toDoList = [
      {
        description: '',
        inEditMode: true,
        status: ToDoStatus.COMPLETED,
        taskId: 1,
      },
    ];
    component.editTask({
      description: '',
      inEditMode: false,
      status: ToDoStatus.COMPLETED,
      taskId: 1,
    });

    expect(component.toDoList.every((task) => task.inEditMode)).toBe(false);
  });

  it('editTask, edit mode', () => {
    component.toDoList = [
      {
        description: '',
        inEditMode: true,
        status: ToDoStatus.COMPLETED,
        taskId: 1,
      },
    ];
    component.editTask({
      description: '',
      inEditMode: true,
      status: ToDoStatus.COMPLETED,
      taskId: 1,
    });

    expect(component.toDoList.every((task) => task.inEditMode)).toBe(true);
  });

  it('deleteTask', () => {
    const spy = spyOn(TodoService.prototype, 'deleteTask');
    spyOn(window, 'confirm').and.callFake(function () {
      return true;
    });

    component.deleteTaskConfirmation({
      description: '',
      inEditMode: false,
      status: ToDoStatus.COMPLETED,
      taskId: 1,
    });

    expect(spy).toHaveBeenCalled();
  });
});
