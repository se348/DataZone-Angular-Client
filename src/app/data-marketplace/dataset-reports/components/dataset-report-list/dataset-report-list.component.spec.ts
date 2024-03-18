import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetReportListComponent } from './dataset-report-list.component';

describe('DatasetReportListComponent', () => {
  let component: DatasetReportListComponent;
  let fixture: ComponentFixture<DatasetReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatasetReportListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatasetReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
