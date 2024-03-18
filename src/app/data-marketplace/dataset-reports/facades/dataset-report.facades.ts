import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { ChangeDatasetReportStatus, GetDatasetReport, GetDatasetReports } from "../store/dataset-report.actions";


@Injectable({
    providedIn: 'root'
})
export class DatasetReportFacade {
    constructor(
        private readonly store: Store
    ) {}

    dispatchGetDatasetReports(pageNumber: number, pageSize: number) {
        this.store.dispatch(new GetDatasetReports(pageNumber, pageSize));
    }

    dispatchGetDatasetReport(reportId: string) {
        this.store.dispatch(new GetDatasetReport(reportId));
    }

    dispatchChangeDatasetReportStatus(reportStatus: string, reportId: string) {
        this.store.dispatch(new ChangeDatasetReportStatus(reportId, reportStatus));
    }
}