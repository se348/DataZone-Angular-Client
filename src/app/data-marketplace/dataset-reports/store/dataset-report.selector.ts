import { Selector, createPropertySelectors } from "@ngxs/store";
import { DatasetReportStateModel, DatasetReportState } from "./dataset-report.state";


export class DatasetReportSelector {
    static slices = createPropertySelectors<DatasetReportStateModel>(DatasetReportState);

    @Selector([DatasetReportState])
    static datasetReports(state: DatasetReportStateModel) {
        return state.datasetReports;
    }

    @Selector([DatasetReportState])
    static selectedDatasetReport(state: DatasetReportStateModel) {
        return state.selectedDatasetReport;
    }
}