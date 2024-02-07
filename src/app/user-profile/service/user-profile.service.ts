import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from '../models/user-profile.model';
import { Observable } from 'rxjs';
import {
  COMPLETE_COMPANY_PROFILE_URL, COMPLETE_USER_PROFILE_URL,
  EDIT_USER_PROFILE_URL,
  GET_USER_PROFILE_URL,
} from 'src/app/core/constants/api-endpoints';
import {CompanyProfile} from "../../company-profile/models/company-profile.model";

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private http: HttpClient) {}

  editUserProfile(request: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.patch<UserProfile>(EDIT_USER_PROFILE_URL, request);
  }

  completeUserProfile(request: FormData): Observable<UserProfile> {
    return this.http.post<UserProfile>(COMPLETE_USER_PROFILE_URL, request);
  }

  getUserProfile(id: String): Observable<UserProfile> {
    return this.http.get<UserProfile>(GET_USER_PROFILE_URL);
  }
}
