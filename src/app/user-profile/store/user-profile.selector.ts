import { Selector, createPropertySelectors } from '@ngxs/store';
import { UserProfileState, UserProfileStateModel } from './user-profile.state';
import { UserProfile } from '../models/user-profile.model';

export class UserProfileSelector {
  static slices = createPropertySelectors<UserProfileStateModel>(UserProfileState);

  @Selector([UserProfileState])
  static userProfile(state: UserProfileStateModel): UserProfile | null {
    return state.userProfile;
  }
}
