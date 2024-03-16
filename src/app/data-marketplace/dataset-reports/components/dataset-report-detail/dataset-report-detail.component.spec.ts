import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetReportDetailComponent } from './dataset-report-detail.component';

describe('DatasetReportDetailComponent', () => {
  let component: DatasetReportDetailComponent;
  let fixture: ComponentFixture<DatasetReportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatasetReportDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatasetReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
