import { PaginatedList } from './../../../../core/models/paginated_list';
import { RxState } from '@rx-angular/state';
import { DatasetReportFacade } from './../../facades/dataset-report.facades';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DatasetReport } from '../../models/dataset-report.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

interface DatasetReportListComponentState {
  datasetReports: PaginatedList<DatasetReport>;
}

const initDatasetReportListComponentState: DatasetReportListComponentState = {
  datasetReports: {
    items: [],
    totalCount: 0,
    totalPages: 0,
    pageNumber: 0,
  },
};

@Component({
  selector: 'app-dataset-report-list',
  templateUrl: './dataset-report-list.component.html',
  styleUrl: './dataset-report-list.component.scss',
})
export class DatasetReportListComponent implements OnInit {
  datasetReports!: DatasetReport[];
  datasetReports$ = this.state.select('datasetReports');
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private readonly datasetReportFacade: DatasetReportFacade,
    private readonly state: RxState<DatasetReportListComponentState>
  ) {
    this.state.set(initDatasetReportListComponentState);
    this.state.connect(
      'datasetReports',
      this.datasetReportFacade.datasetReports$
    );
  }

  ngOnInit(): void {
    this.datasetReportFacade.dispatchGetDatasetReports(
      this.paginator?.pageIndex + 1 || 1,
      this.paginator?.pageSize || 10
    );
    this.datasetReports$.subscribe((datasetReports) => {
      if (datasetReports) this.datasetReports = datasetReports.items;
      this.length = datasetReports.totalCount;
    });
  }

  loadPaginatedReports(event: PageEvent) {
    this.datasetReportFacade.dispatchGetDatasetReports(
      event.pageIndex + 1,
      event.pageSize
    );
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
