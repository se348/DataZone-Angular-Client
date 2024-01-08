import { CompanyProfileSelector } from './../store/company-profile.selector';
import { Observable } from 'rxjs';
import { CompanyProfile } from './../models/company-profile.model';
import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  EditCompanyProfile,
  GetCompanyProfile,
} from '../store/company-profile.actions';

@Injectable({
  providedIn: 'root',
})
export class CompanyProfileFacade {
  companyProfile$: Observable<CompanyProfile> = this.store.select(
    CompanyProfileSelector.companyProfile
  );

  @Select(CompanyProfileSelector.companyProfile)
  companyProfile!: Observable<CompanyProfile>;
  constructor(private store: Store) {}

  dispatchGetCompanyProfile(request: string) {
    this.store.dispatch(new GetCompanyProfile(request));
  }

  dispatchEditCompanyProfile(request: Partial<CompanyProfile>) {
    this.store.dispatch(new EditCompanyProfile(request));
  }
}
