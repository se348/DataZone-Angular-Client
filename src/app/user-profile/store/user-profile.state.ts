import { Router } from '@angular/router';
import { UserProfileService } from './../service/user-profile.service';
import { UserProfile } from './../models/user-profile.model';
import { Action, State, StateContext, StateToken, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { CompleteUserProfile } from './user-profile.actions';
import { tap } from 'rxjs';

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

  @Action(CompleteUserProfile)
  completeUserProfile(
    { patchState }: StateContext<UserProfileStateModel>,
    { request }: CompleteUserProfile
  ) {
    return this.userProfileService.completeProfile(request).pipe(
      tap((response: UserProfile) => {
        patchState({
          userProfile: response,
        });
      })
    );
  }
}
