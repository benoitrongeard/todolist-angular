import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveComponent } from './pages/active/active.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { HomeComponent } from './pages/home/home.component';

import { SharedModule } from './../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule
  ],
  declarations: [ActiveComponent, HomeComponent]
})
export class TasksModule { }
