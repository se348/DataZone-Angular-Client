import { UserProfile } from '../models/user-profile.model';

export class EditUserProfile {
  static readonly type = `[UserProfile] ${EditUserProfile.name}`;
  constructor(public request: Partial<UserProfile>) {}
}
export class GetUserProfile {
  static readonly type = `[UserProfile] ${GetUserProfile.name}`;
  constructor(public request: String) {}
}

export class CompleteUserProfile {
  static readonly type = `[UserProfile] ${CompleteUserProfile.name}`;
  constructor(public request: FormData) {}
}
