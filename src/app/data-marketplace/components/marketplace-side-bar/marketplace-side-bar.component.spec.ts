import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceSideBarComponent } from './marketplace-side-bar.component';

describe('MarketplaceSideBarComponent', () => {
  let component: MarketplaceSideBarComponent;
  let fixture: ComponentFixture<MarketplaceSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketplaceSideBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarketplaceSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
