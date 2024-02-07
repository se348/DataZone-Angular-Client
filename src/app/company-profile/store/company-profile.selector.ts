import { Selector, createPropertySelectors } from '@ngxs/store';
import {
  CompanyProfileState,
  CompanyProfileStateModel,
} from './company-profile.state';
import {CompanyProfile, CompanyProfileResponse} from '../models/company-profile.model';
import {AuthState, AuthStateModel} from "../../auth/store/auth.state";

export class CompanyProfileSelector {
  static slices =
    createPropertySelectors<CompanyProfileStateModel>(CompanyProfileState);

  @Selector([CompanyProfileState])
  static companyProfile(state: CompanyProfileStateModel): CompanyProfile {
    return state.companyProfile!;
  }
}
