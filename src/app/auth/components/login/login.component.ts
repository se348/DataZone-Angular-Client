import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '../../facades/auth.facades';
import { RxState } from '@rx-angular/state';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LANDING_PAGE_ROUTE } from 'src/app/core/constants/routes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface LoginComponentState {
  isAuthenticated: boolean;
}

const initLoginComponentState: LoginComponentState = {
  isAuthenticated: false,
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [RxState],
})
export class LoginComponent implements OnInit {
  isAuthenticated$: Observable<boolean> = this.state.select('isAuthenticated');
  loginForm!: FormGroup;
  hidePassword: boolean = true;

  constructor(
    private readonly authFacade: AuthFacade,
    private readonly state: RxState<LoginComponentState>,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) {
    this.state.set(initLoginComponentState);
    this.state.connect('isAuthenticated', this.authFacade.isAuthenticated$);
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.isAuthenticated$.subscribe((isAuth) => {
      if (isAuth) this.router.navigate([LANDING_PAGE_ROUTE]);
    });
  }

  get emailValidationError() {
    return this.loginForm.controls['email'];
  }

  get passwordFormControl() {
    return this.loginForm.controls['password'];
  }

  login() {
    const { valid, touched, dirty } = this.loginForm;

    if (
      valid &&
      (touched || dirty) &&
      this.loginForm.value.email &&
      this.loginForm.value.password
    ) {
      this.authFacade.dispatchLogin({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      });
    }
  }
}
