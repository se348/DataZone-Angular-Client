import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Action, State, StateContext, StateToken, Store } from '@ngxs/store';

import { LoginResponse } from '../models/auth.model';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { EMAIL_SENT_ROUTE, LANDING_PAGE_ROUTE } from 'src/app/core/constants/routes';
import { CompanyProfileResponse } from '../models/profile.model';
import { Login, CompleteCompanyProfile, ConfirmEmail, Register, ResendConfirmEmail, ForgetPassword, ResetPassword } from './auth.actions';

export interface AuthStateModel {
  accessToken: string | null;
  refreshToken: string | null;
  email: string | null;
  username: string | null;
  companyProfile: CompanyProfileResponse | null
}

const AUTH_STATE_TOKEN = new StateToken<AuthStateModel>('authState');

const defaultState: AuthStateModel = {
  accessToken: null,
  refreshToken: null,
  username: null,
  email: null,
  companyProfile: null
};

@State<AuthStateModel>({
  name: AUTH_STATE_TOKEN,
  defaults: defaultState,
})
@Injectable()
export class AuthState {
  constructor(
    private readonly authService: AuthService,
    private store: Store,
    private readonly router: Router
  ) {}

  @Action(Login)
  login({ patchState }: StateContext<AuthStateModel>, { request }: Login) {
    return this.authService.login(request).pipe(tap(
        (response: LoginResponse) => {
            patchState({
                accessToken: response.accessToken,
                refreshToken: response.refreshToken,
                email: request.email,
            });
        }
    ))
  }

  @Action(CompleteCompanyProfile)
  completeCompanyProfile({ patchState }: StateContext<AuthStateModel>, { request }: CompleteCompanyProfile) {
    return this.authService.completeCompanyProfile(request).pipe(tap(
        (response: CompanyProfileResponse) => {
            patchState({
                companyProfile: response
            });
        }
    ))
  }

  @Action(ConfirmEmail)
  confirmEmail({ patchState }: StateContext<AuthStateModel>, { userId, token }: ConfirmEmail) {
    return this.authService.confirmEmail(userId, token);
  }

  @Action(Register)
  register(
    { patchState } : StateContext<AuthStateModel>,
    { request } : Register
  ) {
    return this.authService.register(request).pipe(tap(
      () => {
        const userEmail = request.email; // Assuming email is in the request
        const queryParams = { email: userEmail };
        this.router.navigate([EMAIL_SENT_ROUTE], {queryParams});
      }
    ));
  }

  @Action(ResendConfirmEmail)
  resendConfirmationEmail({ patchState }: StateContext<AuthStateModel>, {request}: ResendConfirmEmail) {
    return this.authService.resendConfirmEmail(request);
  }

  @Action(ForgetPassword)
  forgetPassword({ patchState }: StateContext<AuthStateModel>, {request}: ForgetPassword) {
    return this.authService.forgetPassword(request);
  }

  @Action(ResetPassword)
  resetPassword({ patchState }: StateContext<AuthStateModel>, {request}: ResetPassword) {
    return this.authService.resetPassword(request);
  }
}
