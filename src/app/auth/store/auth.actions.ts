import { ForgetPasswordRequest, LoginRequest, RegisterRequest, ResendConfirmationRequest, ResetPasswordRequest } from "../models/auth.model";


export class Login {
  static readonly type = `[Auth] ${Login.name}`;
  constructor(public request: LoginRequest) {}
}

export class CompleteCompanyProfile {
    static readonly type = `[Auth] ${CompleteCompanyProfile.name}`;
    constructor(public request: FormData) {}
}
export class ConfirmEmail {
    static readonly type = `[Auth] ${ConfirmEmail.name}`;
    constructor(public userId: string, public code: string) {}
}

export class Register {
  static readonly type = `[Auth] ${Register.name}`;
  constructor(public request: RegisterRequest) {}
}

export class ResendConfirmEmail {
  static readonly type = `[Auth] ${ResendConfirmEmail.name}`;
  constructor(public request: ResendConfirmationRequest) {}
}

export class ForgetPassword {
  static readonly type = `[Auth] ${ForgetPassword.name}`;
  constructor(public request: ForgetPasswordRequest) {}
}

export class ResetPassword {
  static readonly type = `[Auth] ${ResetPassword.name}`;
  constructor(public request: ResetPasswordRequest) {}
}
