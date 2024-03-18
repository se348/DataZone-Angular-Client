import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DATASET_REPORT_URL } from 'src/app/core/constants/api-endpoints';
import { PaginatedList } from 'src/app/core/models/paginated_list';
import { DatasetReport } from '../models/dataset-report.model';

@Injectable({
  providedIn: 'root',
})
export class DatasetReportService {
  constructor(private http: HttpClient) {}
  baseUrl = DATASET_REPORT_URL;

  getReports(pageNumber: number, pageSize: number): Observable<PaginatedList<DatasetReport>> {
    return this.http.get<PaginatedList<DatasetReport>>(`${this.baseUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getReport(reportId: string): Observable<DatasetReport> {
    return this.http.get<DatasetReport>(`${this.baseUrl}/${reportId}`);
  }

  changeReportStatus(reportId: string, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${reportId}`, { status });
  }
}
