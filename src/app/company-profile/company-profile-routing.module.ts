import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  EDIT_USER_PROFILE_PAGE_ROUTE,
  COMPLETE_USER_PROFILE_PAGE_ROUTE,
  EDIT_COMPANY_PROFILE_PAGE_ROUTE,
  COMPLETE_COMPANY_PROFILE_PAGE_ROUTE,
} from '../core/constants/routes';
import {EditCompanyProfileComponent} from "./components/edit-company-profile/edit-company-profile.component";
import {
  CompleteCompanyProfileComponent
} from "./components/complete-company-profile/complete-company-profile.component";

const routes: Routes = [
  {
    path: EDIT_COMPANY_PROFILE_PAGE_ROUTE,
    component: EditCompanyProfileComponent,
  },
  {
    path: COMPLETE_COMPANY_PROFILE_PAGE_ROUTE,
    component: CompleteCompanyProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyProfileRoutingModule {}
