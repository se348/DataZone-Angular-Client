import { TestBed } from '@angular/core/testing';

import { DatasetReportService } from './dataset-report.service';

describe('DatasetReportServiceService', () => {
  let service: DatasetReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatasetReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
