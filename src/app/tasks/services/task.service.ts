import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Task } from './../../shared/models/task';
import { Subject } from 'rxjs';

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks = new Subject<Task []>();

  constructor(private http: HttpClient) {
    if (environment.pusher_app_key) {
      window.Pusher = Pusher

      window.Echo = new Echo({
        broadcaster: 'pusher',
        key: environment.pusher_app_key,
        cluster: 'eu',
        encrypted: true,
        authEndpoint: `${environment.broadcastingBaseUrl}/broadcasting/auth`,
        auth: {
          headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }
      })
    }
   }

  updateTasksData(newTasks: Task []) {
    this.tasks.next(newTasks);
  }

  getTasksData() {
    return this.tasks.asObservable();
  }

  addTask(task: Task) {
    return this.http.post<any>(environment.api + 'tasks', task)
      .pipe(map(task => {
        return new Task(task.data);
      }));
  }

  getTasks() {
    return this.http.get<any>(environment.api + 'tasks')
      .pipe(map(tasks => {
        let tasksArray: Task[] = [];

        for (let taskProps of tasks.data) {
          let taskObj: Task = new Task(taskProps);
          tasksArray.push(taskObj);
        }

        return tasksArray;
      }));
  }

  updateTask(task: Task) {
    return this.http.put<any>(environment.api + 'tasks/' + task.id, task)
      .pipe(map(task => {
        return new Task(task.data);
      }));
  }

  deleteTask(task: Task) {
    return this.http.delete<any>(environment.api + 'tasks/' + task.id)
      .pipe(map(data => {
        return true;
      }));
  }
}
