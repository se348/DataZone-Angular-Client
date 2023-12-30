import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPageLandingComponent } from './confirm-page-landing.component';

describe('ConfirmPageLandingComponent', () => {
  let component: ConfirmPageLandingComponent;
  let fixture: ComponentFixture<ConfirmPageLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmPageLandingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmPageLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
