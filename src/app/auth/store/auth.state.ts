import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Action, State, StateContext, StateToken, Store } from '@ngxs/store';
import { Login, Register } from './auth.actions';
import { LoginResponse } from '../models/auth.model';
import { tap } from 'rxjs';

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


  @Action(Register)
  register(
    { patchState } : StateContext<AuthStateModel>,
    { request } : Register
  ) {
    return this.authService.register(request).pipe(tap(
      () => {}
    ));
  }

}
