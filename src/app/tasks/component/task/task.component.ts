import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/core/alert/alert.service';
import { TaskService } from 'src/app/tasks/services/task.service';
import { Task } from 'src/app/shared/models/task';

@Component({
  selector: 'td-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  faCheck = faCheck;
  faClock = faClock;
  diffDate: number = null;
  loading: boolean = false;

  @Input() task: Task;
  @Output() updateTaskEvent: EventEmitter<Task> = new EventEmitter();


  constructor(private taskService: TaskService, private alert: AlertService) {
   }

  ngOnInit() {
    if (this.task.due_at) {
      let dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      let actualDate: any = new Date();
      let oneDay = 24 * 60 * 60 * 1000;

      let taskDate: any = new Date(this.task.due_at);

      if (taskDate > actualDate) {
        this.diffDate = Math.round(Math.abs((taskDate.getTime() - actualDate.getTime()) / (oneDay)));
      }

      taskDate = taskDate.toLocaleDateString('fr-FR', dateOptions);

      this.task.setDateFormated(taskDate);
    }
  }

  completeTask() {
    this.updateTask("complete");
  }

  updateTask(taskFunction) {
    this.loading = true;
    
    this.task.formatDateForApi();

    switch (taskFunction) {
      case "complete":
        this.task.complete();
        break;

      default:
        break;
    }

    this.taskService.updateTask(this.task)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.updateTaskEvent.emit(this.task);
          this.alert.showSuccess("Task updated");
        },
        error => {
          this.loading = false;
          let errors = this.alert.decodeError(error);
          this.alert.showError(errors);
        });
  }

}
