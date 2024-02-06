import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Action, State, StateContext, StateToken, Store } from '@ngxs/store';

import { LoginResponse } from '../models/auth.model';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import {
  EMAIL_SENT_ROUTE,
  LANDING_PAGE_ROUTE,
} from 'src/app/core/constants/routes';
import {
  Login,
  CompleteCompanyProfile,
  ConfirmEmail,
  Register,
  ResendConfirmEmail,
  ForgetPassword,
  ResetPassword,
} from './auth.actions';
import { ToasterService } from 'src/app/core/service/toast.service';
import { StateMessageService } from 'src/app/core/service/state-message.service';

export interface AuthStateModel {
  accessToken: string | null;
  refreshToken: string | null;
  email: string | null;
  username: string | null;

}

const AUTH_STATE_TOKEN = new StateToken<AuthStateModel>('authState');

const defaultState: AuthStateModel = {
  accessToken: null,
  refreshToken: null,
  username: null,
  email: null,
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
    private readonly router: Router,
    private toasterService: ToasterService,
    private stateMessageService: StateMessageService
  ) {}

  @Action(Login)
  login({ patchState }: StateContext<AuthStateModel>, { request }: Login) {
    return this.authService.login(request).pipe(
      tap((response: LoginResponse) => {
        patchState({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          email: request.email,
        });
      })
    );
  }


  @Action(ConfirmEmail)
  confirmEmail(
    { patchState }: StateContext<AuthStateModel>,
    { userId, token }: ConfirmEmail
  ) {
    return this.authService.confirmEmail(userId, token);
  }

  @Action(Register)
  register(
    { patchState }: StateContext<AuthStateModel>,
    { request }: Register
  ) {
    return this.authService.register(request).pipe(
      tap(() => {
        const userEmail = request.email; // Assuming email is in the request
        const queryParams = { email: userEmail };
        this.router.navigate([EMAIL_SENT_ROUTE], { queryParams });
      })
    );
  }

  @Action(ResendConfirmEmail)
  resendConfirmationEmail(
    { patchState }: StateContext<AuthStateModel>,
    { request }: ResendConfirmEmail
  ) {
    return this.authService.resendConfirmEmail(request);
  }

  @Action(ForgetPassword)
  forgetPassword(
    { patchState }: StateContext<AuthStateModel>,
    { request }: ForgetPassword
  ) {
    this.toasterService.showrToast('loading');

    return this.authService.forgetPassword(request).pipe(
      tap({
        next: () => {
          // Request completed successfully, close the toaster
          this.toasterService.showSuccessToast(
            'Success'
          );
          setTimeout(() => {
            this.toasterService.closehToast();
          }, 2000);

          setTimeout(() => {
            this.stateMessageService.setStateMessage(
              'Reset Password Link Sent to your email'
            );
            this.router.navigate(['/success']);
          }, 2000);
        },
        error: (error) => {
          // Request completed with an error, close the toaster and handle the error as needed
          this.toasterService.showErrorToast(error);
          setTimeout(() => {
            this.toasterService.closehToast();
          }, 4000);
          // You can also dispatch an action to handle the error in your state or show another toast
        },
      })
    );
  }

  @Action(ResetPassword)
  resetPassword(
    { patchState }: StateContext<AuthStateModel>,
    { request }: ResetPassword
  ) {
    this.toasterService.showrToast('loading');

    return this.authService.resetPassword(request).pipe(
      tap({
        next: () => {
          this.toasterService.showSuccessToast('Password reseted successfully');
          setTimeout(() => {
            this.toasterService.closehToast();
          }, 4000);
          this.router.navigate(['/landing-page']);
        },
        error: (error) => {
          // Request completed with an error, close the toaster and handle the error as needed
          this.toasterService.showErrorToast(error);
          setTimeout(() => {
            this.toasterService.closehToast();
          }, 3000);
          // You can also dispatch an action to handle the error in your state or show another toast
        },
      })
    );
  }
}
