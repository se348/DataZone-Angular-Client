import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  EDIT_USER_PROFILE_PAGE_ROUTE,
} from '../core/constants/routes';
import { EditUserProfileComponent } from './components/complete-user-profile/complete-user-profile.component';

const routes: Routes = [
  {
    path: EDIT_USER_PROFILE_PAGE_ROUTE,
    component: EditUserProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {}
