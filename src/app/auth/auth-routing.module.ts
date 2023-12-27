import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../core/constants/routes';
import { SignUpComponent } from './components/sign-up/sign-up.component';

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
    path: REGISTER_ROUTE,
    component: SignUpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
