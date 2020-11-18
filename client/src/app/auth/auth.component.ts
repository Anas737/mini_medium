import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  isForRegistering = false;
  isSubmitting = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  get email() {
    return this.authForm.get('email');
  }

  get username() {
    return this.authForm.get('username');
  }

  get password() {
    return this.authForm.get('password');
  }

  get confirmPassword() {
    return this.authForm.get('confirmPassword');
  }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submitForm() {
    this.isSubmitting = true;

    const user = {
      ...this.authForm.value,
    };

    const auth$ = this.isForRegistering
      ? this.userService.register(user)
      : this.userService.login(user);

    auth$.subscribe((user) => {
      console.log(user);
      this.router.navigateByUrl('/');
    });
  }

  onSetAuthType(_isForRegistering) {
    this.isForRegistering = _isForRegistering;

    if (_isForRegistering) {
      this.authForm.addControl(
        'username',
        new FormControl('', Validators.required)
      );
      this.authForm.addControl(
        'confirmPassword',
        new FormControl('', Validators.required)
      );
    } else {
      this.authForm.removeControl('username');
      this.authForm.removeControl('confirmPassword');
    }
  }
}
