import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropDatasetComponent } from './drag-drop-dataset.component';

describe('DragDropComponent', () => {
  let component: DragDropDatasetComponent;
  let fixture: ComponentFixture<DragDropDatasetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DragDropDatasetComponent]
    });
    fixture = TestBed.createComponent(DragDropDatasetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
