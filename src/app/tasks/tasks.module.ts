import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveComponent } from './pages/active/active.component';
import { TasksRoutingModule } from './tasks-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TasksRoutingModule
  ],
  declarations: [ActiveComponent]
})
export class TasksModule { }
