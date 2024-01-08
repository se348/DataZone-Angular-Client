import { Router } from '@angular/router';
import { CompanyProfileService } from './../service/company-profile.service';
import { CompanyProfile } from './../models/company-profile.model';
import { Action, State, StateContext, StateToken, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  EditCompanyProfile,
  GetCompanyProfile,
} from './company-profile.actions';
import { tap } from 'rxjs';

export interface CompanyProfileStateModel {
  companyProfile: CompanyProfile | null;
}

const CompanyProfile_STATE_TOKEN = new StateToken<CompanyProfileStateModel>(
  'CompanyProfileState'
);
const defaultState: CompanyProfileStateModel = {
  companyProfile: null,
};

@State<CompanyProfileStateModel>({
  name: CompanyProfile_STATE_TOKEN,
  defaults: defaultState,
})
@Injectable()
export class CompanyProfileState {
  constructor(
    private readonly CompanyProfileService: CompanyProfileService,
    private store: Store,
    private readonly router: Router
  ) {}

  @Action(EditCompanyProfile)
  editCompanyProfile(
    { patchState }: StateContext<CompanyProfileStateModel>,
    { request }: EditCompanyProfile
  ) {
    return this.CompanyProfileService.editCompanyProfile(request).pipe(
      tap((response: CompanyProfile) => {
        patchState({
          companyProfile: response,
        });
      })
    );
  }

  @Action(GetCompanyProfile)
  getCompanyProfile(
    { patchState }: StateContext<CompanyProfileStateModel>,
    { request }: GetCompanyProfile
  ) {
    return this.CompanyProfileService.getCompanyProfile(request).pipe(
      tap((response: CompanyProfile) => {
        patchState({
          companyProfile: response,
        });
      })
    );
  }
}
