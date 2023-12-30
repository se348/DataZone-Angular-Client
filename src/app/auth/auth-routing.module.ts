import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { COMPLETE_PROFILE_PAGE_ROUTE, CONFIRM_EMAIL_ROUTE, LOGIN_ROUTE } from '../core/constants/routes';
import { CompleteCompanyProfileComponent } from './components/complete-company-profile/complete-company-profile.component';
import { CONFIRM_EMAIL_URL } from '../core/constants/api-endpoints';
import { ConfirmPageLandingComponent } from './components/confirm-page-landing/confirm-page-landing.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: LOGIN_ROUTE,
    pathMatch: 'full',
  },
  {
    path: LOGIN_ROUTE,
    component: LoginComponent,
  },
  {
    path: COMPLETE_PROFILE_PAGE_ROUTE,
    component: CompleteCompanyProfileComponent,
  },

  {
    path: CONFIRM_EMAIL_ROUTE,
    component: ConfirmPageLandingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
