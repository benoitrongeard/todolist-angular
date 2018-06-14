import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from './../auth/auth.service';
import { AlertService } from './../alert/alert.service';

@Component({
  selector: 'td-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  errors: boolean = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder, 
    private auth: AuthService, 
    private alert: AlertService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    if (this.auth.alreadyConnected()) {
      this.router.navigate(['/']);
    }

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      rememberMeState: ['']
    });
  }

  register() {
    this.submitted = true;
    this.loading = true;

    // Stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.auth.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/']);
          this.alert.showSuccess("You are now registered and connected");
        },
        error => {
          let errors = this.alert.decodeError(error);
          this.alert.showError(errors);
          this.errors = true;
          this.loading = false;
          this.registerForm.controls['password'].setValue("");
          this.registerForm.controls['password_confirmation'].setValue("");
        });
  }

  rememberMe() {
    localStorage.setItem("rememberMeState", this.registerForm.controls['rememberMeState'].value);
  }
}
