import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyProfile } from '../models/company-profile.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyProfileService {
  constructor(private http: HttpClient) {}

  editCompanyProfile(
    request: Partial<CompanyProfile>
  ): Observable<CompanyProfile> {
    return this.http.patch<CompanyProfile>(
      'http://localhost:3000/companies/1',
      request
    );
  }

  getCompanyProfile(id: String): Observable<CompanyProfile> {
    return this.http.get<CompanyProfile>('http://localhost:3000/companies/1');
  }
}
