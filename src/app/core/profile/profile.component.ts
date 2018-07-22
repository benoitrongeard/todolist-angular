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
  private userProfileForm: FormGroup;
  private userSecurityForm: FormGroup;
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

    this.userProfileForm = this.formBuilder.group({
      email: [this.user.email, Validators.required],
      name: [this.user.name, Validators.required],
      id: [this.user.id]
    });

    this.userSecurityForm = this.formBuilder.group({
      current_password: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      id: [this.user.id]
    });
  }

  updateUserProfil() {
    this.submitted = true;
    this.loading = true;

    // Stop here if form is invalid
    if (this.userProfileForm.invalid) {
      this.loading = false;
      return;
    }

    this.auth.updateUser(this.userProfileForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.alert.showSuccess("Update completed");
        },
        error => {
          this.loading = false;
          let errors = this.alert.decodeError(error, this.userProfileForm);
          this.alert.showError(errors);
          this.loading = false;
        });
  }

  updateUserSecurity() {
    this.submitted = true;
    this.loading = true;
    
    // Stop here if form is invalid
    if (this.userSecurityForm.invalid) {
      this.loading = false;
      return;
    }

    this.auth.updateUser(this.userSecurityForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.submitted = false;
          this.alert.showSuccess("Update completed");
          this.userSecurityForm.controls['current_password'].setValue("");
          this.userSecurityForm.controls['password'].setValue("");
          this.userSecurityForm.controls['password_confirmation'].setValue("");
        },
        error => {
          this.loading = false;
          let errors = this.alert.decodeError(error, this.userSecurityForm);
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
    this.auth.deleteUserAccount(this.userProfileForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.auth.logout();
          this.router.navigate(['/login']);
        },
        error => {
          this.loading = false;
          let errors = this.alert.decodeError(error, this.userProfileForm);
          this.alert.showError(errors);
          this.loading = false;
        });
  }

  toggleTab(tabSelected: string) {
    this.tab = tabSelected;
  }
}
