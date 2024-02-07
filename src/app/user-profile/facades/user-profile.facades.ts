import { UserProfileSelector } from '../store/user-profile.selector';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/user-profile.model';
import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {CompleteUserProfile, EditUserProfile, GetUserProfile} from '../store/user-profile.actions';


@Injectable({
  providedIn: 'root',
})
export class UserProfileFacade {

  @Select(UserProfileSelector.userProfile)
  userProfile!: Observable<UserProfile>;
  constructor(private store: Store) {}

  dispatchGetUserProfile(request: string) {
    this.store.dispatch(new GetUserProfile(request));
  }

  dispatchEditUserProfile(request: Partial<UserProfile>) {
    this.store.dispatch(new EditUserProfile(request));
  }



  dispatchCompleteUserProfile(request: FormData) {
    this.store.dispatch(new CompleteUserProfile(request));
  }
}
