import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  COMPLETE_USER_PROFILE_PAGE_ROUTE,
  LANDING_PAGE_ROUTE,
  EDIT_COMPANY_PROFILE_PAGE_ROUTE
} from './core/constants/routes';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CompleteUserProfileComponent, } from './user-profile/components/complete-user-profile/complete-user-profile.component';
import { EditCompanyProfileComponent } from './company-profile/components/edit-company-profile/edit-company-profile.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: LANDING_PAGE_ROUTE,
    component: LandingPageComponent,
  },
  {
    path: COMPLETE_USER_PROFILE_PAGE_ROUTE,
    component: CompleteUserProfileComponent,
  },
  {
    path: EDIT_COMPANY_PROFILE_PAGE_ROUTE,
    component: EditCompanyProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
