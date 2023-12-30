import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthSelector } from '../store/auth.selector';
import { LoginRequest } from '../models/auth.model';
import { Select, Store } from '@ngxs/store';
import { CompleteCompanyProfile, ConfirmEmail, Login } from '../store/auth.actions';
import { CompanyProfileRequest, CompanyProfileResponse } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  isAuthenticated$: Observable<boolean> = this.store.select(
    AuthSelector.isAuthenticated
  );

  @Select(AuthSelector.accessToken)
  accessToken$!: Observable<string>;

  
  @Select(AuthSelector.companyProfile)
  companyProfile$!: Observable<CompanyProfileResponse | null>;

  constructor(private store: Store) {}

  dispatchLogin(request: LoginRequest) {
    this.store.dispatch(new Login(request));
  }

  dispatchCompleteCompanyProfile(request: CompanyProfileRequest) {
    this.store.dispatch(new CompleteCompanyProfile(request));
  }

  dispatchConfirmEmail(userId: string, token: string) {
    this.store.dispatch(new ConfirmEmail(userId, token));
  }
}
