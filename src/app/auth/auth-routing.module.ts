import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LOGIN_ROUTE } from '../core/constants/routes';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
