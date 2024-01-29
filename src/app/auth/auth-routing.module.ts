import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { COMPLETE_PROFILE_PAGE_ROUTE, CONFIRM_EMAIL_ROUTE, ROLES_LIST_ROUTE, EMAIL_SENT_ROUTE, FORGET_PASSWORD_ROUTE, RESET_PASSWORD_ROUTE } from '../core/constants/routes';
import { CompleteCompanyProfileComponent } from './components/complete-company-profile/complete-company-profile.component';
import { CONFIRM_EMAIL_URL, RESET_PASSWORD } from '../core/constants/api-endpoints';
import { ConfirmPageLandingComponent } from './components/confirm-page-landing/confirm-page-landing.component';
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../core/constants/routes';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { RolesListComponent } from './components/roles-list/roles-list.component';
import { EmailSentComponent } from './components/email-sent/email-sent.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

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
  {
    path: REGISTER_ROUTE,
    component: SignUpComponent
  },
  {
    path: ROLES_LIST_ROUTE,
    component: RolesListComponent
  },
  {
    path: EMAIL_SENT_ROUTE,
    component: EmailSentComponent,
  },
  {
    path: FORGET_PASSWORD_ROUTE,
    component: ForgetPasswordComponent,
  },
  {
    path: RESET_PASSWORD_ROUTE,
    component: ResetPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
