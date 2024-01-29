import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { CompanyProfileState } from './store/company-profile.state';
import { RxState } from '@rx-angular/state';
import { EditCompanyProfileComponent } from './components/edit-company-profile/edit-company-profile.component';
import {CompanyProfileRoutingModule} from "./company-profile-routing.module";
import {
  CompleteCompanyProfileComponent
} from "./components/complete-company-profile/complete-company-profile.component";

@NgModule({
  declarations: [
    EditCompanyProfileComponent, CompleteCompanyProfileComponent
  ],
  imports: [
    CommonModule,
    CompanyProfileRoutingModule,
    SharedModule,
    NgxsModule.forFeature([CompanyProfileState]),
  ],
  providers: [RxState],
})
export class CompanyProfileModule {}
