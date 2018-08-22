import { Task } from './../../../shared/models/task';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'td-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent implements OnInit {

  tasks: Task [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.tasks = this.route.parent.snapshot.data.tasks;
  }

}
