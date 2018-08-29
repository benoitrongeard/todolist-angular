import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/models/task';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/tasks/services/task.service';

@Component({
  selector: 'td-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent implements OnInit {
  allTasks: Task[];
  completedTasks: Task[];


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

  findActiveTasks(tasks: Task[]) {
    this.completedTasks = this.allTasks.filter((task) => {
      if (task.is_completed) {
        return task;
      }
    });
  }

  updateTask($event: Task) {
    let index = this.allTasks.findIndex(task => task.id === $event.id);
    this.allTasks[index] = $event;
    this.taskService.updateTasksData(this.allTasks);
  }

  deleteTask($event: Task) {
    let index = this.allTasks.indexOf($event);
    this.allTasks.splice(index, 1);
    this.taskService.updateTasksData(this.allTasks);
  }

}
