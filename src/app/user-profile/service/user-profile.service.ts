import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from '../models/user-profile.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private http: HttpClient) {}

  completeProfile(request: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.patch<UserProfile>('http://localhost:3000/users/1', request);
  }

  getUserProfile(id: String): Observable<UserProfile> {
    return this.http.get<UserProfile>('http://localhost:3000/users/1');
  }
}
