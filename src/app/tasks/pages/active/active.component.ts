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
  tasks: Task [];

  constructor(private route: ActivatedRoute, private taskService: TaskService) {
    this.tasks = this.route.parent.snapshot.data.tasks;
   }

  ngOnInit() {
    this.taskService.getTasksData().subscribe((tasks) => {
      this.tasks = tasks
    });
  }
}
