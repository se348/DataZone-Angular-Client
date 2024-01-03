import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RxState } from '@rx-angular/state';
import { LANDING_PAGE_ROUTE, LOGIN_ROUTE } from 'src/app/core/constants/routes';
import { AuthFacade } from '../../facades/auth.facades';
import { of } from 'rxjs';

interface SignupComponentState {
  accessToken: string | null;
}

const initComponentState: SignupComponentState = {
  accessToken: null,
};

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  registerForm!: FormGroup;
  password: string = "";

  constructor(
    private readonly state: RxState<SignupComponentState>,
    private readonly router: Router,
    private readonly authFacade: AuthFacade,
    private readonly formBuilder: FormBuilder
  ) {
    this.state.set(initComponentState);
    this.state.connect('accessToken', this.authFacade.accessToken$);
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required], this.passwordValidator()],
      confirmPassword: [
        '',
        [Validators.required],
        this.confirmPasswordValidator(),
      ],
    });
  }
  ngOnInit(): void {
    this.state.select('accessToken').subscribe((isAuth) => {
      if (isAuth) this.router.navigate([LANDING_PAGE_ROUTE]);
    });
  }

  register() {
    const { valid, touched, dirty } = this.registerForm;

    if (
      valid &&
      (touched || dirty) &&
      this.registerForm.value.email &&
      this.registerForm.value.password
    ) {
      this.authFacade.dispatchRegister({
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      });
    }
  }

  navigateToLogin() {
    this.router.navigate([LOGIN_ROUTE]);
  }

  get hasUpper(): boolean {
    let password = this.registerForm.value.password;
    return this.hasUppers(password);
  }

  hasUppers(password: string): boolean {
    let regex = /.*[A-Z].*/;
    return regex.test(password);
  }

  get hasLower(): boolean {
    let password = this.registerForm.value.password;
    return this.hasLowers(password);
  }

  hasLowers(password: string): boolean {
    let regex = /.*[a-z].*/;
    return regex.test(password);
  }

  get hasDigits(): boolean {
    let password = this.registerForm.value.password;
    return this.hasDigit(password);
  }

  hasDigit(password: string): boolean {
    let regex = /.*[0-9].*/;
    return regex.test(password);
  }

  get hasSpecialChar(): boolean {
    let password = this.registerForm.value.password;
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
    const { valid, touched, dirty } = this.registerForm;
    return !!valid &&
    !!(touched || dirty);
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
      this.registerForm.value.confirmPassword,
      this.registerForm.value.password
    );
  }

  passwordsMatch(confirmPassword: string, password: string) {
    return password === confirmPassword;
  }

  get isRightLength(): boolean {
    return this.registerForm.value.password.length >= 8;
  }

  isLengthRight(password: string): boolean {
    return password.length >= 8;
  }
}
