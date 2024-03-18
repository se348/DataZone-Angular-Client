import { PaginatedList } from 'src/app/core/models/paginated_list';
import { DatasetReport } from '../models/dataset-report.model';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { DatasetReportService } from '../services/dataset-report.service';
import { ChangeDatasetReportStatus, GetDatasetReport, GetDatasetReports } from './dataset-report.actions';
import { tap } from 'rxjs';

export interface DatasetReportStateModel {
  datasetReports: PaginatedList<DatasetReport> | null;
  selectedDatasetReport: DatasetReport | null;
}

const DATASET_REPORTS_STATE_TOKEN = new StateToken<DatasetReportStateModel>(
  'DatasetReportState'
);

const defaultState: DatasetReportStateModel = {
  datasetReports: null,
  selectedDatasetReport: null
};

@State<DatasetReportStateModel>({
  name: DATASET_REPORTS_STATE_TOKEN,
  defaults: defaultState,
})
@Injectable()
export class DatasetReportState {
  constructor(private readonly datasetReportService: DatasetReportService, ) {}

  @Action(GetDatasetReports)
    getDatasetReports(
        { patchState }: StateContext<DatasetReportStateModel>,
        { pageNumber, pageSize }: GetDatasetReports
    ) {
        return this.datasetReportService.getReports(pageNumber, pageSize).pipe(
        tap((response) => {
            patchState({
            datasetReports: response,
            });
        })
        );
    }

    @Action(GetDatasetReport)
    getDatasetReport(
        { patchState }: StateContext<DatasetReportStateModel>,
        { reportId }: GetDatasetReport
    ) {
        return this.datasetReportService.getReport(reportId).pipe(
        tap((response) => {
            patchState({
            selectedDatasetReport: response,
            });
        })
        );
    }

    @Action(ChangeDatasetReportStatus)
    changeDatasetReportStatus(
        { patchState }: StateContext<DatasetReportStateModel>,
        { reportId, status }: ChangeDatasetReportStatus
    ) {
        return this.datasetReportService.changeReportStatus(reportId, status).pipe(
        tap(() => {
            patchState({
            selectedDatasetReport: null,
            });
        })
        );
    }
}
