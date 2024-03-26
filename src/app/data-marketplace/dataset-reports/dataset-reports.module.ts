import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxState } from '@rx-angular/state';
import { DatasetReportsRoutingModule } from './dataset-reports-routing.module';
import { NgxsModule } from '@ngxs/store';
import { DatasetReportState } from './store/dataset-report.state';
import { DatasetReportDetailComponent } from './components/dataset-report-detail/dataset-report-detail.component';
import { DatasetReportListComponent } from './components/dataset-report-list/dataset-report-list.component';
import { ReportFormComponent } from './components/report-form/report-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    DatasetReportListComponent,
    DatasetReportDetailComponent,
    ReportFormComponent,
  ],
  imports: [
    CommonModule,
    DatasetReportsRoutingModule,
    NgxsModule.forFeature([DatasetReportState]),
    SharedModule,
    SharedModule
  ],
  providers: [RxState],
})
export class DatasetReportsModule {}
