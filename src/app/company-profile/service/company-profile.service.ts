import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyProfile } from '../models/company-profile.model';
import { Observable } from 'rxjs';
import { EDIT_COMPANY_PROFILE_URL, GET_COMPANY_PROFILE_URL } from 'src/app/core/constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class CompanyProfileService {
  constructor(private http: HttpClient) {}

  editCompanyProfile(
    request: Partial<CompanyProfile>
  ): Observable<CompanyProfile> {
    return this.http.patch<CompanyProfile>(
      EDIT_COMPANY_PROFILE_URL,
      request
    );
  }

  getCompanyProfile(id: String): Observable<CompanyProfile> {
    return this.http.get<CompanyProfile>(GET_COMPANY_PROFILE_URL);
  }
}
