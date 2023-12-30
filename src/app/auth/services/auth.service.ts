import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '../models/auth.model';
import { Observable } from 'rxjs';
import { COMPLETE_COMPANY_PROFILE_URL, CONFIRM_EMAIL_URL, LOGIN_URL } from 'src/app/core/constants/api-endpoints';
import { CompleteCompanyProfile } from '../store/auth.actions';
import { CompanyProfileRequest, CompanyProfileResponse } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(LOGIN_URL, request);
  }
  completeCompanyProfile(request: CompanyProfileRequest): Observable<CompanyProfileResponse> {
    return this.http.post<CompanyProfileResponse>(COMPLETE_COMPANY_PROFILE_URL, request);
  }

  confirmEmail(userId :string, token: string) {
    return this.http.get(`CONFIRM_EMAIL_URL?userId=${userId}&code=${token}`, {});
  }

}
