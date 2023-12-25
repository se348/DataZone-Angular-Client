import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LANDING_PAGE_ROUTE } from './core/constants/routes';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: LANDING_PAGE_ROUTE,
    component: LandingPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
