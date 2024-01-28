export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string | null;
  refreshToken: string | null;
}

export interface User {
  userName: string;
}
export interface RegisterRequest {
  email: string;
  password: string;
}
export interface ResendConfirmationRequest {
  email: string;
}

export interface ForgetPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  resetCode: string;
  newPassword: string;
}
