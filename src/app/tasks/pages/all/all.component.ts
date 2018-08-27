import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/models/task';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/tasks/services/task.service';

@Component({
  selector: 'td-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  allTasks: Task[];

  constructor(private route: ActivatedRoute, private taskService: TaskService) { 
    this.allTasks = this.route.parent.snapshot.data.tasks;
  }

  ngOnInit() {
    this.taskService.getTasksData().subscribe((tasks) => {
      this.allTasks = tasks;
    });
  }

  updateTask($event: Task) {
    let index = this.allTasks.indexOf($event);
    this.allTasks[index] = $event;
    this.taskService.updateTasksData(this.allTasks);
  }
}
