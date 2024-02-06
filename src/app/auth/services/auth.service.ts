import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { LOGIN_URL, COMPLETE_COMPANY_PROFILE_URL, REGISTER_URL, RESEND_CONFIRM_EMAIL_URL, FORGET_PASSWORD, RESET_PASSWORD } from "src/app/core/constants/api-endpoints";
import { ForgetPasswordRequest, LoginRequest, LoginResponse, RegisterRequest, ResendConfirmationRequest, ResetPasswordRequest } from "../models/auth.model";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(LOGIN_URL, request);
  }

  confirmEmail(userId:string, token: string) {
    return this.http.get(`CONFIRM_EMAIL_URL?userId=${userId}&code=${token}`, {});
  }

  register(request: RegisterRequest): Observable<any> {
    return this.http.post<any>(REGISTER_URL, request);
  }

  resendConfirmEmail(request: ResendConfirmationRequest){
    return this.http.post<any>(RESEND_CONFIRM_EMAIL_URL, request)
  }

  forgetPassword(request: ForgetPasswordRequest){
    return this.http.post<any>(FORGET_PASSWORD, request).pipe(
      catchError((error, caught) => {
        throw error.message || 'Server Error';
      })
    )
  }

  resetPassword(request: ResetPasswordRequest){
    console.log(request, 'request');
    return this.http.post<any>(RESET_PASSWORD, request).pipe(
      catchError((error, caught) => {
        throw error.message || 'Server Error';
      })
    )
  }

}
