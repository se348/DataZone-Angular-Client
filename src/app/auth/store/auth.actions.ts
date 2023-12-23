import { LoginRequest } from "../models/auth.model";

export class Login {
    static readonly type = `[Auth] ${Login.name}`;
    constructor(public request: LoginRequest) {}
}