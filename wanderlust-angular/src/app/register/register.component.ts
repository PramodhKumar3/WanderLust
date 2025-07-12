import { Component, OnInit } from '@angular/core';
import { Users } from '../models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  successMessage: string = "";
  errorMessage: string = "";
  userDetails!: Users;
  registerForm!: FormGroup
  showForm = true;


  constructor(private fb: FormBuilder, private service: RegisterService, private router: Router) { }


  ngOnInit() {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.pattern("([A-Za-z]+( [A-Za-z]+)*)")]],
      emailId: ['', [Validators.required, Validators.pattern("([A-Za-z0-9]+[@]([A-Za-z]+(.com)))")]],
      contactNumber: ['', [Validators.required, Validators.pattern("[6-9]\\d{9}")]],
      password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(20),
      Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%&#^])[A-Za-z\\d@$!%*?&#^]{7,20}")]]
    })
  }
  register() {
    this.errorMessage = "";
    this.successMessage = ""
    this.service.register(this.registerForm.value).subscribe(
      (response: any) => {
        this.successMessage = response || "Congratulations, you have registered successfully";
        this.showForm = false;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 5000)
      },
      (errorResponse: any) => {
        this.errorMessage = JSON.parse(errorResponse.error).errorMessage;
      }

    )
  }

}
