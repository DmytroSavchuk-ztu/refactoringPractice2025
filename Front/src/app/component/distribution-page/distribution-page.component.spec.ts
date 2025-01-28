import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionPageComponent } from './distribution-page.component';

describe('DistributionPageComponent', () => {
  let component: DistributionPageComponent;
  let fixture: ComponentFixture<DistributionPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributionPageComponent]
    });
    fixture = TestBed.createComponent(DistributionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
