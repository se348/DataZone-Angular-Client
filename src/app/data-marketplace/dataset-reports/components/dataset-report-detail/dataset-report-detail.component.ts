import { Component } from '@angular/core';
import { DatasetReport } from '../../models/dataset-report.model';
import { DatasetReportFacade } from '../../facades/dataset-report.facades';
import { RxState } from '@rx-angular/state';

interface DatasetReportDetailComponentState {
  selectedDatasetReport: DatasetReport | null;
}

const initDatasetReportListComponentState: DatasetReportDetailComponentState = {
  selectedDatasetReport: null,
};

@Component({
  selector: 'app-dataset-report-detail',
  templateUrl: './dataset-report-detail.component.html',
  styleUrl: './dataset-report-detail.component.scss',
})
export class DatasetReportDetailComponent {
  selectedDatasetReport$ = this.state.select('selectedDatasetReport');
  selectedDatasetReport: DatasetReport | null = null;

  constructor(
    private readonly datasetReportFacade: DatasetReportFacade,
    private readonly state: RxState<DatasetReportDetailComponentState>
  ) {
    this.state.set(initDatasetReportListComponentState);
    this.state.connect(
      'selectedDatasetReport',
      this.datasetReportFacade.selectedDatasetReport$
    );
  }

  ngOnInit(): void {
    this.selectedDatasetReport$.subscribe((selectedDatasetReport) => {
      if (selectedDatasetReport)
        this.selectedDatasetReport = selectedDatasetReport;
    });
  }

  approveReport(reportId: string) {
    this.datasetReportFacade.dispatchChangeDatasetReportStatus(
      'Approve',
      reportId
    );
  }

  rejectReport(reportId: string) {
    this.datasetReportFacade.dispatchChangeDatasetReportStatus(
      'Reject',
      reportId
    );
  }
}
