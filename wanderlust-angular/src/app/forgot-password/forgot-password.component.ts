import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordService } from './forgot-password.service';
import { Users } from '../models/User';
import { Router } from '@angular/router';
import { CustomValidators } from './custom-validator';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  passwordSuccessMessage = "";
  passswordErrorMessage = "";
  numberSuccessMessage = "";
  numberErrorMessage = "";
  isNumberValidated = false;
  
  @Input() display: boolean = false;
  @Output() closeEvent = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private passwordService: ForgotPasswordService, private router: Router) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      contactNumber: ['', [Validators.required, Validators.pattern("[6-9]\\d{9}")]],
      password: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(7), Validators.maxLength(20),
      Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%&#^])[A-Za-z\\d@$!%*?&#^]{7,20}")]],
      confirmPassword: [{ value: '', disabled: true }, [Validators.required, CustomValidators.passwordMatchValidator]]
    });
  }

  closeDialog() {
    this.display = false;
    this.closeEvent.emit(false);
    this.resetForm();
  }

  resetForm() {
    this.resetPasswordForm.reset();
    this.isNumberValidated = false;
    this.numberSuccessMessage = "";
    this.numberErrorMessage = "";
    this.passswordErrorMessage = "";
    this.passwordSuccessMessage = "";
    this.disablePasswordFields();
  }

  validateContactNumber() {
    this.numberErrorMessage = "";
    this.numberSuccessMessage = "";
    this.isNumberValidated = false;
    this.disablePasswordFields();

    if (this.resetPasswordForm.get('contactNumber')?.invalid) {
      this.isNumberValidated = false;
      this.disablePasswordFields();
      return;
    }
    
    const data = {
      contactNumber: this.resetPasswordForm.get('contactNumber')?.value
    };

    this.passwordService.validateContactNumber(data).subscribe({
      next: (response: any) => {
        if (response.message) {
          const message = response.message.toLowerCase();
          if (message.includes('contact number does not exits.')) {
            this.numberErrorMessage = response.message;
            this.isNumberValidated = false;
          } else {
            this.numberSuccessMessage = response.message;
            this.isNumberValidated = true;
            this.enablePasswordFields();
          }
        } else {
          this.isNumberValidated = false;
        }
      },
      error: (error) => {
        this.numberErrorMessage = error.error.errorMessage;
        this.isNumberValidated = false;
        this.disablePasswordFields();
        this.passswordErrorMessage = "";
        this.passwordSuccessMessage = "";
      }
    });
  }

  resetPassword() {
    this.passswordErrorMessage = "";
    this.passwordSuccessMessage = "";
    
    if (this.resetPasswordForm.invalid) {
      this.passswordErrorMessage = "Please fill all fields correctly";
      return;
    }
    
    const data = {
      contactNumber: this.resetPasswordForm.get('contactNumber')?.value,
      newPassword: this.resetPasswordForm.get('password')?.value
    };

    this.passwordService.resetPassword(data).subscribe({
      next: (response: any) => {
        if (response.message) {
          this.passwordSuccessMessage = response.message;
        }
        
        setTimeout(() => {
          this.closeDialog();
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (error) => {
        this.passswordErrorMessage = error.error.errorMessage || "Something went wrong";
      }
    });
  }

  enablePasswordFields() {
    this.resetPasswordForm.get('password')?.enable();
    this.resetPasswordForm.get('confirmPassword')?.enable();
  }
  
  disablePasswordFields() {
    this.resetPasswordForm.get('password')?.reset();
    this.resetPasswordForm.get('password')?.disable();
    this.resetPasswordForm.get('confirmPassword')?.reset();
    this.resetPasswordForm.get('confirmPassword')?.disable();
  }
}