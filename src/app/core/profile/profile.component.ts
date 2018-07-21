import { AuthService } from 'src/app/core/auth';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/core/alert/alert.service';

@Component({
  selector: 'td-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private userForm: FormGroup;
  private user: User;
  private submitted: boolean = false;
  private loading: boolean = false;
  tab: string = "profile";

  constructor(
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private alert: AlertService) { }

  ngOnInit() {
    this.user = this.route.snapshot.data.user;

    this.userForm = this.formBuilder.group({
      email: [this.user.email, Validators.required],
      name: [this.user.name, Validators.required],
      id: [this.user.id]
    });
  }

  updateUser() {
    this.submitted = true;
    this.loading = true;

    // Stop here if form is invalid
    if (this.userForm.invalid) {
      this.loading = false;
      return;
    }

    this.auth.updateUser(this.userForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.alert.showSuccess("Update completed");
        },
        error => {
          this.loading = false;
          let errors = this.alert.decodeError(error);
          this.alert.showError(errors);
          this.loading = false;
        });
  }

  confirmDelete() {
    if (confirm('Are you sure ? Your tasks and your account will be deleted forever.')) {
      this.deleteUserAccount();
    }
  }

  deleteUserAccount() {
    this.submitted = true;
    this.loading = true; 
    this.auth.deleteUserAccount(this.userForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.auth.logout();
          this.router.navigate(['/login']);
        },
        error => {
          this.loading = false;
          let errors = this.alert.decodeError(error);
          this.alert.showError(errors);
          this.loading = false;
        });
  }

  toggleTab(tabSelected: string) {
    this.tab = tabSelected;
  }
}
