import { UserProfileSelector } from './../store/user-profile.selector';
import { Observable } from 'rxjs';
import { UserProfile } from './../models/user-profile.model';
import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { EditUserProfile, GetUserProfile } from '../store/user-profile.actions';

@Injectable({
  providedIn: 'root',
})
export class UserProfileFacade {
  userProfile$: Observable<UserProfile> = this.store.select(
    UserProfileSelector.userProfile
  );

  @Select(UserProfileSelector.userProfile)
  userProfile!: Observable<UserProfile>;
  constructor(private store: Store) {}

  dispatchGetUserProfile(request: string) {
    this.store.dispatch(new GetUserProfile(request));
  }

  dispatchEditUserProfile(request: Partial<UserProfile>) {
    this.store.dispatch(new EditUserProfile(request));
  }
}
