import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { ToDoStatus } from '../model';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('addToDoTask', () => {
    service.addToDoTask({
      description: '',
      status: ToDoStatus.COMPLETED,
      taskId: 1,
    });
    expect(service.toDoList$.getValue().length).toBeGreaterThan(0);
  });

  it('editToDoTask', () => {
    const mockDesciption = 'TEST UPDATED';
    service.toDoList$.next([
      {
        description: '',
        status: ToDoStatus.COMPLETED,
        taskId: 1,
      },
    ]);
    service.editToDoTask({
      description: mockDesciption,
      status: ToDoStatus.COMPLETED,
      taskId: 1,
    });

    expect(service.toDoList$.getValue()[0].description).toBe(mockDesciption);
  });

  it('deleteTask', () => {
    service.toDoList$.next([
      {
        description: '',
        status: ToDoStatus.COMPLETED,
        taskId: 1,
      },
    ]);
    service.deleteTask(1);
    expect(service.toDoList$.getValue().length).toBe(0);
  });
});
