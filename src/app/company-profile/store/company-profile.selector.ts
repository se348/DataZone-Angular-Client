import { Selector, createPropertySelectors } from '@ngxs/store';
import {
  CompanyProfileState,
  CompanyProfileStateModel,
} from './company-profile.state';
import { CompanyProfile } from '../models/company-profile.model';

export class CompanyProfileSelector {
  static slices =
    createPropertySelectors<CompanyProfileStateModel>(CompanyProfileState);

  @Selector([CompanyProfileState])
  static companyProfile(state: CompanyProfileStateModel): CompanyProfile {
    return state.companyProfile!;
  }
}
