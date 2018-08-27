import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/core/alert/alert.service';
import { TaskService } from 'src/app/tasks/services/task.service';
import { Task } from 'src/app/shared/models/task';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'td-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  faCheck = faCheck;
  faClock = faClock;
  faCalendar = faCalendarAlt;
  diffDate: number = null;
  loading: boolean = false;
  mode: string = 'consult';
  updateTaskForm: FormGroup;

  @Input() task: Task;
  @Output() updateTaskEvent: EventEmitter<Task> = new EventEmitter();
  @Output() deleteTaskEvent: EventEmitter<Task> = new EventEmitter();


  constructor(private formBuilder: FormBuilder, private taskService: TaskService, private alert: AlertService) {
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

    this.updateTaskForm = this.formBuilder.group({
      title: [this.task.title, Validators.required],
      due_at: [this.task.due_at],
      is_completed: [this.task.is_completed],
      id: [this.task.id]
    });
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

  toggleMode(mode: string) {
    this.mode = mode;
  }

  deleteTask() {
    this.loading = true;

    this.taskService.deleteTask(this.task)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.deleteTaskEvent.emit(this.task);
          this.alert.showSuccess("Task deleted");
        },
        error => {
          this.loading = false;
          let errors = this.alert.decodeError(error);
          this.alert.showError(errors);
        });
  }
}
