import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  ForgetPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResendConfirmationRequest,
  ResetPasswordRequest,
} from '../models/auth.model';
import { CompanyProfileResponse } from '../models/profile.model';
import {
  Login,
  CompleteCompanyProfile,
  ConfirmEmail,
  Register,
  ResendConfirmEmail,
  ForgetPassword,
  ResetPassword,
} from '../store/auth.actions';
import { AuthSelector } from '../store/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  isAuthenticated$: Observable<boolean> = this.store.select(
    AuthSelector.isAuthenticated
  );

  @Select(AuthSelector.accessToken)
  accessToken$!: Observable<string>;

  @Select(AuthSelector.companyProfile)
  companyProfile$!: Observable<CompanyProfileResponse | null>;

  constructor(private store: Store) {}

  dispatchLogin(request: LoginRequest) {
    this.store.dispatch(new Login(request));
  }

  dispatchCompleteCompanyProfile(request: FormData) {
    this.store.dispatch(new CompleteCompanyProfile(request));
  }

  dispatchConfirmEmail(userId: string, code : string) {
    this.store.dispatch(new ConfirmEmail(userId, code));
  }
  dispatchRegister(request: RegisterRequest) {
    this.store.dispatch(new Register(request));
  }

  dispatchResendConfirmationEmail(request: ResendConfirmationRequest) {
    this.store.dispatch(new ResendConfirmEmail(request));
  }

  dispatchForgetPassword(request: ForgetPasswordRequest) {
    this.store.dispatch(new ForgetPassword(request));
  }

  dispatchResetPassword(request: ResetPasswordRequest) {
    this.store.dispatch(new ResetPassword(request));
  }
}
