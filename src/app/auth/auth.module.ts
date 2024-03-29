import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxState } from '@rx-angular/state';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthState } from './store/auth.state';
import { NgxsModule } from '@ngxs/store';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { SharedComponentModule } from '../shared/shared-component/shared-component.module';
import { CompleteCompanyProfileComponent } from '../company-profile/components/complete-company-profile/complete-company-profile.component';
import { ConfirmPageLandingComponent } from './components/confirm-page-landing/confirm-page-landing.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { RolesListComponent } from './components/roles-list/roles-list.component';
import { RoleState } from './store/roles/role.state';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    ConfirmPageLandingComponent,
    SignUpComponent,
    RolesListComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    NgxsModule.forFeature([AuthState]),
    NgxsModule.forFeature([RoleState]),
    SharedComponentModule,
    CdkStepperModule,
  ],
  providers: [RxState],
})
export class AuthModule {}
