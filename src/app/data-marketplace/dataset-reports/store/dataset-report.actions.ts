export class GetDatasetReports {
  static readonly type = `[Dataset-Report] ${GetDatasetReports.name}`;
  constructor(public pageNumber: number, public pageSize: number) {}
}

export class GetDatasetReport {
  static readonly type = `[Dataset-Report] ${GetDatasetReport.name}`;
  constructor(public reportId: string) {}
}

export class ChangeDatasetReportStatus {
  static readonly type = `[Dataset-Report] ${ChangeDatasetReportStatus.name}`;
  constructor(public reportId: string, public status: string) {}
}
