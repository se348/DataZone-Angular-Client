export enum InfringementType {
  CopyRight,
  FalseData,
  Privacy,
  Other
}

export enum DatasetReportStatus {
  Approved,
  Rejected,
  Pending,
}

export interface DatasetReport {
  id: string;
  message: string;
  datasetId: string;
  status: DatasetReportStatus;
  infringementType: InfringementType;
}
