import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export class CustomValidators {

  static passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const newPassword = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      return { passwordMismatch: true };
    } else {
      return null;
    }
  };
}
