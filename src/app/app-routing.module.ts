import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  EDIT_USER_PROFILE_PAGE_ROUTE,
  LANDING_PAGE_ROUTE,
  EDIT_COMPANY_PROFILE_PAGE_ROUTE,
  SUCCESS_ROUTE,
} from './core/constants/routes';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { EditUserProfileComponent } from './user-profile/components/complete-user-profile/complete-user-profile.component';
import { EditCompanyProfileComponent } from './company-profile/components/edit-company-profile/edit-company-profile.component';
import { SuccessIndicatorComponent } from './shared/shared-component/success-indicator/success-indicator.component';
import { SuccessPageComponent } from './shared/shared-component/success-page/success-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'marketplace',
    loadChildren: () =>
      import('./data-marketplace/data-marketplace.module').then(
        (m) => m.DataMarketplaceModule
      ),
  },
  {
    path: LANDING_PAGE_ROUTE,
    component: LandingPageComponent,
  },
  {
    path: EDIT_USER_PROFILE_PAGE_ROUTE,
    component: EditUserProfileComponent,
  },
  {
    path: EDIT_COMPANY_PROFILE_PAGE_ROUTE,
    component: EditCompanyProfileComponent,
  },
  {
    path: SUCCESS_ROUTE,
    component: SuccessPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
