import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'td-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private user: User;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = this.route.snapshot.data.user;
  }

}
