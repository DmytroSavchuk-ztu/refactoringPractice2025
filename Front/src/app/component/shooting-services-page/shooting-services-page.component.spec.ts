import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootingServicesPageComponent } from './shooting-services-page.component';

describe('ShootingServicesPageComponent', () => {
  let component: ShootingServicesPageComponent;
  let fixture: ComponentFixture<ShootingServicesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShootingServicesPageComponent]
    });
    fixture = TestBed.createComponent(ShootingServicesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
