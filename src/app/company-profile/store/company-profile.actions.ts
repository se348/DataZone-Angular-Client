import { CompanyProfile } from '../models/company-profile.model';

// Update company profile
export class EditCompanyProfile {
  static readonly type = `[CompanyProfile] ${EditCompanyProfile.name}`;
  constructor(public request: Partial<CompanyProfile>) {}
}
// Get company profile
export class GetCompanyProfile {
  static readonly type = `[CompanyProfile] ${GetCompanyProfile.name}`;
  constructor(public request: String) {}
}



