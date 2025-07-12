import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { Users } from '../models/User';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerPage: Boolean = false;
  loginForm!: FormGroup;
  errorMessage: string = "";
  user: Users = new Users();
  showForgotPassword: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private auth: AuthService, 
    private loginservice: LoginService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      contactNumber: ['', [
        Validators.required, 
        Validators.pattern("^[6-9][0-9]{9}$")
      ]],
      password: ['', [
        Validators.required, 
        Validators.minLength(7), 
        Validators.maxLength(20),
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%&#^])[A-Za-z\\d@$!%*?&#^]{7,20}")
      ]]
    });
  }

  login() {
    this.loginservice.login(this.loginForm.value).subscribe(
      (response: any) => {
        this.errorMessage = "";
        this.user = response;
        this.auth.nextUser(this.user);
        sessionStorage.setItem("userId", "" + this.user.userId);
        this.router.navigate(['/home']);
      },
      (errorResponse: any) => {
        this.errorMessage = errorResponse.error.errorMessage;
        sessionStorage.clear();
      }
    );
  }

  getRegisterPage() {
    this.registerPage = true;
    this.router.navigate(['/', 'register']);
  }

  showForgotPasswordDialog() {
    this.showForgotPassword = true;
  }
  
  onForgotPasswordClose(event: boolean) {
    this.showForgotPassword = event;
  }
}