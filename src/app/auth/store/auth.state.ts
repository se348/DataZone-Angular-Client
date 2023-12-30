import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Action, State, StateContext, StateToken, Store } from '@ngxs/store';
import { CompleteCompanyProfile, ConfirmEmail, Login } from './auth.actions';
import { LoginResponse } from '../models/auth.model';
import { tap } from 'rxjs';
import { CompanyProfileResponse } from '../models/profile.model';

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
    private store: Store
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
}
