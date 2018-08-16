import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Task } from './../../shared/models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  addTask(task: Task) {
    return this.http.post<any>(environment.api + 'tasks', task)
      .pipe(map(task => {
        return new Task(task.data);
      }));
  }
}
