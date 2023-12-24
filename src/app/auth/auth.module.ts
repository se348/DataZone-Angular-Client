import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxState } from '@rx-angular/state';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthState } from './store/auth.state';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    NgxsModule.forFeature([AuthState]),
  ],
  providers: [RxState]
})
export class AuthModule {}
