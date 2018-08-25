import { Task } from './../../../shared/models/task';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/tasks/services/task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'td-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent implements OnInit {
  allTasks: Task [];
  activeTasks: Task [];


  constructor(private route: ActivatedRoute, private taskService: TaskService) {
    this.allTasks = this.route.parent.snapshot.data.tasks;
    this.findActiveTasks(this.allTasks);
   }

  ngOnInit() {
    this.taskService.getTasksData().subscribe((tasks) => {
      this.allTasks = tasks;
      this.findActiveTasks(this.allTasks);
    });
  }

  findActiveTasks(tasks: Task []) {
    this.activeTasks = this.allTasks.filter((task) => {
      if (!task.is_completed) {
        return task;
      }
    });
  }

  updateTask($event: Task) {
    let index = this.allTasks.indexOf($event);
    this.allTasks[index] = $event;
    this.taskService.updateTasksData(this.allTasks);
  }
}
