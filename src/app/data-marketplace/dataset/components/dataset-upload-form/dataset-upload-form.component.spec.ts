import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatasetUploadFormComponent } from './dataset-upload-form.component';



describe('DatasetUploadFormComponent', () => {
  let component: DatasetUploadFormComponent;
  let fixture: ComponentFixture<DatasetUploadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatasetUploadFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatasetUploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
