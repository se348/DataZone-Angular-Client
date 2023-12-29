import { UserProfile } from '../models/user-profile.model';

export class CompleteUserProfile {
  static readonly type = `[UserProfile] ${CompleteUserProfile.name}`;
  constructor(public request: UserProfile) {}
}

