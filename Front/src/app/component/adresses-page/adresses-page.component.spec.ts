import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdressesPageComponent } from './adresses-page.component';

describe('AdressesPageComponent', () => {
  let component: AdressesPageComponent;
  let fixture: ComponentFixture<AdressesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdressesPageComponent]
    });
    fixture = TestBed.createComponent(AdressesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
