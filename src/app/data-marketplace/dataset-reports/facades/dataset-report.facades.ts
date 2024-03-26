import { Injectable } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { ChangeDatasetReportStatus, GetDatasetReport, GetDatasetReports } from "../store/dataset-report.actions";
import { DatasetReportSelector } from "../store/dataset-report.selector";
import { Observable } from "rxjs";
import { PaginatedList } from "src/app/core/models/paginated_list";
import { DatasetReport } from "../models/dataset-report.model";


@Injectable({
    providedIn: 'root'
})
export class DatasetReportFacade {
    @Select(DatasetReportSelector.datasetReports)
    datasetReports$!: Observable<PaginatedList<DatasetReport>>;


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