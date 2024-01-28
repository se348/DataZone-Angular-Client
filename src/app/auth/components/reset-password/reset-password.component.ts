import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthFacade } from '../../facades/auth.facades';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  email!: string | null;
  code!: string;
  password!: string;
  confirmPassword!: string | null;
  resetForm!: FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(
    private activeRoute: ActivatedRoute,
    private authFacade: AuthFacade,
    private readonly formBuilder: FormBuilder
  ) {
    this.activeRoute.queryParams.subscribe((p) => {
      this.code = p['code'];
    });
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required], this.passwordValidator()],
      confirmPassword: [
        '',
        [Validators.required],
        this.confirmPasswordValidator(),
      ],
    });
  }

  onSubmit(): void {
    const { valid, touched, dirty } = this.resetForm;
    if (valid && (touched || dirty)) {
      this.authFacade.dispatchResetPassword({
        email: this.resetForm.value.email,
        resetCode: this.code,
        newPassword: this.resetForm.value.password,
      });
    }
  }

  get hasUpper(): boolean {
    let password = this.resetForm.value.password;
    return this.hasUppers(password);
  }

  hasUppers(password: string): boolean {
    let regex = /.*[A-Z].*/;
    return regex.test(password);
  }

  get hasLower(): boolean {
    let password = this.resetForm.value.password;
    return this.hasLowers(password);
  }

  hasLowers(password: string): boolean {
    let regex = /.*[a-z].*/;
    return regex.test(password);
  }

  get hasDigits(): boolean {
    let password = this.resetForm.value.password;
    return this.hasDigit(password);
  }

  hasDigit(password: string): boolean {
    let regex = /.*[0-9].*/;
    return regex.test(password);
  }

  get hasSpecialChar(): boolean {
    let password = this.resetForm.value.password;
    return this.hasSpecialChars(password);
  }

  onPasswordChange(e: any) {
    this.password = e.target.value;
  }

  hasSpecialChars(password: string): boolean {
    let regex = /.*[^a-zA-Z0-9].*/;
    return regex.test(password);
  }

  get isFormValid(): boolean {
    const { valid, touched, dirty } = this.resetForm;
    return !!valid && !!(touched || dirty);
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid =
        this.hasSpecialChars(control.value) &&
        this.hasDigit(control.value) &&
        this.hasLowers(control.value) &&
        this.hasUppers(control.value) &&
        this.isLengthRight(control.value);

      return isValid ? of(null) : of({ forbidden: { value: control.value } });
    };
  }

  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return this.passwordsMatch(control.value, this.password)
        ? of(null)
        : of({ forbidden: { value: control.value } });
    };
  }

  get passwordMatch(): boolean {
    return this.passwordsMatch(
      this.resetForm.value.confirmPassword,
      this.resetForm.value.password
    );
  }

  passwordsMatch(confirmPassword: string, password: string) {
    return password === confirmPassword;
  }

  get isRightLength(): boolean {
    return this.resetForm.value.password.length >= 8;
  }

  isLengthRight(password: string): boolean {
    return password.length >= 8;
  }
}
