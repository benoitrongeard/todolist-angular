import { TaskService } from './task.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TasksResolverService implements Resolve<any> {

  constructor(private taskService: TaskService) { }

  resolve() {
    return this.taskService.getTasks();
  }
}
