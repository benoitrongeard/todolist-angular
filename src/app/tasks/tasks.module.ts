import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../shared/shared.module';

import { HomeComponent } from './pages/home/home.component';
import { ActiveComponent } from './pages/active/active.component';
import { TaskComponent } from './component/task/task.component';

@NgModule({
  imports: [
    CommonModule,
    TasksRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [ActiveComponent, HomeComponent, TaskComponent]
})
export class TasksModule { }
