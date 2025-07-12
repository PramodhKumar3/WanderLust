// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Users } from '../models/User';
// import { AuthService } from '../core/auth.service';
// import { ProfileService } from '../service/profile.service';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css']
// })
// export class ProfileComponent implements OnInit {
//   profileForm!: FormGroup;
//   passwordForm!: FormGroup;
//   user: Users = new Users();
//   userId: string | null = null;
//   editMode: boolean = false;
//   successMessage: string = '';
//   errorMessage: string = '';
//   passwordSuccessMessage: string = '';
//   passwordErrorMessage: string = '';
//   showPassword: boolean = false;
//   showNewPassword: boolean = false;
//   showConfirmPassword: boolean = false;

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private profileService: ProfileService
//   ) { }

//   ngOnInit(): void {
//     this.userId = sessionStorage.getItem('userId');
//     this.initForms();
//     this.loadUserProfile();
//   }

//   initForms(): void {
//     // Profile form with validations as per requirements
//     this.profileForm = this.fb.group({
//       userName: ['', [
//         Validators.required,
//         Validators.pattern(/^(?!\s)(?!.*\s$)(?=.*[a-zA-Z])[a-zA-Z\s]+$/)
//       ]],
//       emailId: ['', [
//         Validators.required,
//         Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
//       ]],
//       contactNumber: ['', [
//         Validators.required,
//         Validators.pattern(/^[0-9]{10}$/)
//       ]]
//     });

//     // Password form with validations
//     this.passwordForm = this.fb.group({
//       currentPassword: ['', Validators.required],
//       newPassword: ['', [
//         Validators.required,
//         Validators.minLength(7),
//         Validators.maxLength(20),
//         Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-!@#$%^&*])[A-Za-z\d\-!@#$%^&*]{7,20}$/)
//       ]],
//       confirmPassword: ['', Validators.required]
//     }, { validator: this.passwordMatchValidator });
//   }

//   loadUserProfile(): void {
//     if (this.userId) {
//       this.profileService.getUserById(this.userId).subscribe({
//         next: (userData) => {
//           this.user = userData;
//           this.profileForm.patchValue({
//             userName: this.user.userName,
//             emailId: this.user.emailId,
//             contactNumber: this.user.contactNumber
//           });
//         },
//         error: (err) => {
//           this.errorMessage = 'Failed to load profile data. Please try again.';
//           console.error('Error loading profile:', err);
//         }
//       });
//     }
//   }

//   toggleEditMode(): void {
//     this.editMode = !this.editMode;
//     this.successMessage = '';
//     this.errorMessage = '';
//   }

//   updateProfile(): void {
//     if (this.profileForm.valid) {
//       const updatedUser = new Users();
//       updatedUser.userId = this.user.userId;
//       updatedUser.userName = this.profileForm.value.userName;
//       updatedUser.emailId = this.profileForm.value.emailId;
//       updatedUser.contactNumber = this.profileForm.value.contactNumber;

//       this.profileService.updateUserProfile(updatedUser).subscribe({
//         next: (response) => {
//           this.user = updatedUser;
//           this.successMessage = 'Profile updated successfully!';
//           this.editMode = false;
          
//           // Update username in session if it changed
//           if (sessionStorage.getItem('userName') !== updatedUser.userName) {
//             sessionStorage.setItem('userName', updatedUser.userName);
//             // Update the username displayed in navbar
//             this.authService.nextUser(updatedUser);
//           }
//         },
//         error: (err) => {
//           this.errorMessage = err.error?.message || 'Profile update failed. Please try again.';
//           console.error('Error updating profile:', err);
//         }
//       });
//     }
//   }

//   changePassword(): void {
//     if (this.passwordForm.valid) {
//       const passwords = {
//         userId: this.userId,
//         currentPassword: this.passwordForm.value.currentPassword,
//         newPassword: this.passwordForm.value.newPassword
//       };

//       this.profileService.changePassword(passwords).subscribe({
//         next: (response) => {
//           this.passwordSuccessMessage = 'Password changed successfully!';
//           this.passwordErrorMessage = '';
//           this.passwordForm.reset();
//         },
//         error: (err) => {
//           this.passwordErrorMessage = err.error?.message || 'Password change failed. Please verify your current password and try again.';
//           this.passwordSuccessMessage = '';
//         }
//       });
//     }
//   }

//   passwordMatchValidator(g: FormGroup): null | { mismatch: boolean } {
//     const newPassword = g.get('newPassword')?.value;
//     const confirmPassword = g.get('confirmPassword')?.value;
//     return newPassword === confirmPassword ? null : { mismatch: true };
//   }

//   togglePasswordVisibility(field: string): void {
//     if (field === 'current') {
//       this.showPassword = !this.showPassword;
//     } else if (field === 'new') {
//       this.showNewPassword = !this.showNewPassword;
//     } else if (field === 'confirm') {
//       this.showConfirmPassword = !this.showConfirmPassword;
//     }
//   }

//   cancelEdit(): void {
//     this.editMode = false;
//     this.profileForm.patchValue({
//       userName: this.user.userName,
//       emailId: this.user.emailId,
//       contactNumber: this.user.contactNumber
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from '../models/User';
import { AuthService } from '../core/auth.service';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  user: Users = new Users();
  userId: string | null = null;
  editMode: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  passwordSuccessMessage: string = '';
  passwordErrorMessage: string = '';
  showPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    this.initForms();
    this.loadUserProfile();
  }

  initForms(): void {
    // Profile form with validations as per requirements
    this.profileForm = this.fb.group({
      userName: ['', [
        Validators.required,
        Validators.pattern(/^(?!\s)(?!.*\s$)(?=.*[a-zA-Z])[a-zA-Z\s]+$/)
      ]],
      emailId: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      contactNumber: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ]]
    });

    // Password form with validations
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-!@#$%^&*])[A-Za-z\d\-!@#$%^&*]{7,20}$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  loadUserProfile(): void {
    if (this.userId) {
      this.profileService.getUserById(this.userId).subscribe({
        next: (userData) => {
          this.user = userData;
          this.profileForm.patchValue({
            userName: this.user.userName,
            emailId: this.user.emailId,
            contactNumber: this.user.contactNumber
          });
        },
        error: (err) => {
          this.errorMessage = 'Failed to load profile data. Please try again.';
          console.error('Error loading profile:', err);
        }
      });
    }
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    this.successMessage = '';
    this.errorMessage = '';
  }

  updateProfile(): void {
    if (this.profileForm.valid) {
      const updatedUser = new Users();
      updatedUser.userId = this.user.userId;
      updatedUser.userName = this.profileForm.value.userName;
      updatedUser.emailId = this.profileForm.value.emailId;
      updatedUser.contactNumber = this.profileForm.value.contactNumber;

      this.profileService.updateUserProfile(updatedUser).subscribe({
        next: (response) => {
          this.user = updatedUser;
          this.successMessage = 'Profile updated successfully!';
          this.editMode = false;
          
          // Update username in session if needed
          sessionStorage.setItem('userName', updatedUser.userName);
          // Update the displayed username in navbar
          this.authService.nextUser(updatedUser);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Profile update failed. Please try again.';
          console.error('Error updating profile:', err);
        }
      });
    }
  }

changePassword(): void {
  if (this.passwordForm.valid) {
    const passwords = {
      userId: this.userId,
      currentPassword: this.passwordForm.value.currentPassword,
      newPassword: this.passwordForm.value.newPassword
    };

    this.profileService.changePassword(passwords).subscribe({
      next: (response) => {
        // Now response is a string, not a JSON object
        console.log('Password change successful:', response);
        this.passwordSuccessMessage = 'Password changed successfully!';
        this.passwordErrorMessage = '';
        this.passwordForm.reset();
        
        // Reset validators state after form reset
        Object.keys(this.passwordForm.controls).forEach(key => {
          this.passwordForm.get(key)?.setErrors(null);
        });
      },
      error: (err) => {
        console.error('Password change error:', err);
        // More detailed error handling
        if (err.status === 401 || err.status === 400) {
          this.passwordErrorMessage = 'Current password is incorrect. Please verify and try again.';
        } else {
          this.passwordErrorMessage = 'Password change failed. Please try again later.';
        }
        this.passwordSuccessMessage = '';
      }
    });
  }
}
  passwordMatchValidator(g: FormGroup): null | { mismatch: boolean } {
    const newPassword = g.get('newPassword')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  togglePasswordVisibility(field: string): void {
    if (field === 'current') {
      this.showPassword = !this.showPassword;
    } else if (field === 'new') {
      this.showNewPassword = !this.showNewPassword;
    } else if (field === 'confirm') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  cancelEdit(): void {
    this.editMode = false;
    this.profileForm.patchValue({
      userName: this.user.userName,
      emailId: this.user.emailId,
      contactNumber: this.user.contactNumber
    });
  }
}