import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    // Here, you can add your authentication logic if needed.
    // For simplicity, we'll assume successful login for now.

    // Redirect to the dashboard when both username and password are provided
    this.router.navigate(['/dashboard']); // Replace '/dashboard' with your actual route path
  }
}
