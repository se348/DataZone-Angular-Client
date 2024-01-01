import { LoginRequest, RegisterRequest } from '../models/auth.model';

export class Login {
  static readonly type = `[Auth] ${Login.name}`;
  constructor(public request: LoginRequest) {}
}

export class Register {
  static readonly type = `[Auth] ${Register.name}`;
  constructor(public request: RegisterRequest) {}
}
