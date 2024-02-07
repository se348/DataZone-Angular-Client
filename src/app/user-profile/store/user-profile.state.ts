import { Router } from '@angular/router';
import { UserProfileService } from './../service/user-profile.service';
import { UserProfile } from './../models/user-profile.model';
import { Action, State, StateContext, StateToken, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {CompleteUserProfile, EditUserProfile, GetUserProfile} from './user-profile.actions';
import { tap } from 'rxjs';
import {CompleteCompanyProfile} from "../../auth/store/auth.actions";
import {CompanyProfile} from "../../company-profile/models/company-profile.model";
import {CompanyProfileStateModel} from "../../company-profile/store/company-profile.state";

export interface UserProfileStateModel {
  userProfile: UserProfile | null;
}

const USERPROFILE_STATE_TOKEN = new StateToken<UserProfileStateModel>(
  'userProfileState'
);
const defaultState: UserProfileStateModel = {
  userProfile: null,
};

@State<UserProfileStateModel>({
  name: USERPROFILE_STATE_TOKEN,
  defaults: defaultState,
})
@Injectable()
export class UserProfileState {
  constructor(
    private readonly userProfileService: UserProfileService,
    private store: Store,
    private readonly router: Router
  ) {}

  @Action(EditUserProfile)
  editUserProfile(
    { patchState }: StateContext<UserProfileStateModel>,
    { request }: EditUserProfile
  ) {
    return this.userProfileService.editUserProfile(request).pipe(
      tap((response: UserProfile) => {
        patchState({
          userProfile: response,
        });
      })
    );
  }

  @Action(CompleteUserProfile)
  completeCompanyProfile({ patchState }: StateContext<UserProfileStateModel>, { request }: CompleteUserProfile) {
    return this.userProfileService.completeUserProfile(request).pipe(tap(
      (response: UserProfile) => {
        patchState({
          userProfile: response
        });
      }
    ))
  }

  @Action(GetUserProfile)
  getUserProfile(
    { patchState }: StateContext<UserProfileStateModel>,
    { request }: GetUserProfile
  ) {
    return this.userProfileService.getUserProfile(request).pipe(
      tap((response: UserProfile) => {
        patchState({
          userProfile: response,
        });
      })
    );
  }
}
