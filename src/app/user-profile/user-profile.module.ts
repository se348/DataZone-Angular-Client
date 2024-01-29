import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { NgxsModule } from '@ngxs/store';
import { UserProfileState } from './store/user-profile.state';
import { RxState } from '@rx-angular/state';
import { EditUserProfileComponent } from './components/edit-user-profile/edit-user-profile.component';
import {CompleteUserProfileComponent} from "./components/complete-user-profile/complete-user-profile.component";

@NgModule({
  declarations: [EditUserProfileComponent, CompleteUserProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserProfileRoutingModule,
    NgxsModule.forFeature([UserProfileState]),
  ],
  providers: [RxState],
})
export class UserProfileModule {}
