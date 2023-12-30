import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LOGIN_ROUTE, REGISTER_ROUTE, COMPLETE_USER_PROFILE_PAGE_ROUTE } from '../core/constants/routes';
import { CompleteUserProfileComponent } from './components/complete-user-profile/complete-user-profile.component';

const routes: Routes = [
  {
    path: COMPLETE_USER_PROFILE_PAGE_ROUTE,
    component: CompleteUserProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {}
