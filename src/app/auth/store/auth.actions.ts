import { LoginRequest, RegisterRequest } from '../models/auth.model';
import { CompanyProfileRequest } from "../models/profile.model";

export class Login {
  static readonly type = `[Auth] ${Login.name}`;
  constructor(public request: LoginRequest) {}
}

export class CompleteCompanyProfile {
    static readonly type = `[Auth] ${CompleteCompanyProfile.name}`;
    constructor(public request: CompanyProfileRequest) {}
}
export class ConfirmEmail {
    static readonly type = `[Auth] ${ConfirmEmail.name}`;
    constructor(public userId: string , public token: string) {}
}

export class Register {
  static readonly type = `[Auth] ${Register.name}`;
  constructor(public request: RegisterRequest) {}
}
