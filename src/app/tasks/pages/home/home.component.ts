import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/alert/alert.service';
import { TaskService } from 'src/app/tasks/services/task.service';
import { first } from 'rxjs/operators';
import { Task } from 'src/app/shared/models/task';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'td-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faPlus = faPlus;
  faCalendar = faCalendarAlt;
  addTaskForm: FormGroup;
  loading: boolean = false;
  tab: string = "active";
  tasks: Task [];
  activeTask = 0;
  completedTask = 0;
  private taskObj: Task = new Task({ 'title': '', 'due_at': null, 'is_completed': false });

  constructor(private formBuilder: FormBuilder, 
    private taskService: TaskService, 
    private alert: AlertService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.tab = this.route.snapshot.firstChild.url[0].path;
    this.tasks = this.route.snapshot.data.tasks;
    this.taskService.updateTasksData(this.tasks);
    this.countTask();

    this.taskService.getTasksData().subscribe((tasks) => {
      this.tasks = tasks;
      this.countTask();
    });
    
    this.addTaskForm = this.formBuilder.group({
      title: [this.taskObj.title, Validators.required],
      due_at: [this.taskObj.due_at]
    });
  }

  addTask() {
    this.loading = true;

    this.taskObj = new Task(this.addTaskForm.value);
    let calendarDate = this.addTaskForm.controls.due_at.value;
    if (calendarDate != null) {
      let dateFormated: any = new Date(calendarDate);
      dateFormated = dateFormated.toLocaleDateString('fr-CA');
      this.taskObj.setDate(dateFormated);
    }

    // Stop here if form is invalid
    if (this.addTaskForm.invalid) {
      this.loading = false;
      return;
    }

    this.taskService.addTask(this.taskObj)
      .pipe(first())
      .subscribe(
        data => {
          this.tasks.push(data);
          this.countTask();
          this.taskService.updateTasksData(this.tasks);
          this.loading = false;
          this.alert.showSuccess("Task added");
          this.addTaskForm.reset();
        },
        error => {
          this.loading = false;
          let errors = this.alert.decodeError(error, this.addTaskForm);
          this.alert.showError(errors);
        });
  }

  toggleTab(tabSelected: string) {
    this.tab = tabSelected;
  }

  countTask() {
    this.activeTask = 0;
    this.completedTask = 0;

    for (let task of this.tasks) {
      if (task.is_completed) {
        this.completedTask++;
      } else {
        this.activeTask++;
      }
    }
  }
}
