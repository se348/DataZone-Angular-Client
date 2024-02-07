import { Selector, createPickSelector, createPropertySelectors, createSelector } from '@ngxs/store';
import { AuthState, AuthStateModel } from './auth.state';
import {CompanyProfileResponse} from "../../company-profile/models/company-profile.model";

export class AuthSelector {
  static authState = createSelector(
    [AuthState],
    (state: AuthStateModel) => state,
  );

  static tokens = createPickSelector(this.authState, [
    'accessToken',
    'refreshToken',
  ]);
  static slices = createPropertySelectors<AuthStateModel>(AuthState);

  @Selector([AuthState])
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.accessToken;
  }


  @Selector([AuthState])
  static accessToken(state: AuthStateModel): string | null {
    return state.accessToken;
  }
}
