import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleVacancyPageComponent } from './single-vacancy-page.component';

describe('SingleVacancyPageComponent', () => {
  let component: SingleVacancyPageComponent;
  let fixture: ComponentFixture<SingleVacancyPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleVacancyPageComponent]
    });
    fixture = TestBed.createComponent(SingleVacancyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
