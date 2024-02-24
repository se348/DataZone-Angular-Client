import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetPreviewComponent } from './dataset-preview.component';

describe('DatasetPreviewComponent', () => {
  let component: DatasetPreviewComponent;
  let fixture: ComponentFixture<DatasetPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatasetPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatasetPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
