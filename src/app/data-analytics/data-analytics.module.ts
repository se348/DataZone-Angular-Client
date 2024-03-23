import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TestComponent} from "./components/test/test.component";
import {CompanyProfileRoutingModule} from "../company-profile/company-profile-routing.module";
import {SharedModule} from "../shared/shared.module";
import {NgxsModule} from "@ngxs/store";
import {RxState} from "@rx-angular/state";
import {DataAnalyticsRoutingModule} from "./data-analytics-routing.module";
import {DataAnalyticsState} from "./store/dataAnalytics.state";



@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    DataAnalyticsRoutingModule,
    SharedModule,
    NgxsModule.forFeature([DataAnalyticsState]),
  ],
  providers: [RxState],
})
export class DataAnalyticsModule { }
