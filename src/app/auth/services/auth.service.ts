import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse, RegisterRequest } from '../models/auth.model';
import { Observable } from 'rxjs';
import { LOGIN_URL, REGISTER_URL } from 'src/app/core/constants/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(LOGIN_URL, request);
  }

  register(request: RegisterRequest): Observable<any> {
    return this.http.post<any>(REGISTER_URL, request);
  }

}
