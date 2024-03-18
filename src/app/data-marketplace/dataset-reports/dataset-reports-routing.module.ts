import { DatasetReport } from './models/dataset-report.model';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatasetReportListComponent } from './components/dataset-report-list/dataset-report-list.component';
import { DatasetReportDetailComponent } from './components/dataset-report-detail/dataset-report-detail.component';

const routes: Routes = [
    {
        path: "",
        component: DatasetReportListComponent,
    },
    {
        path: "detail",
        component: DatasetReportDetailComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatasetReportsRoutingModule {}
