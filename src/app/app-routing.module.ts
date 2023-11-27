import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListModule } from './components/todo-list';

const routes: Routes = [{ path: '', loadChildren: () => TodoListModule }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
