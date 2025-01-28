import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCrewComponentComponent } from './single-crew-component.component';

describe('SingleCrewComponentComponent', () => {
  let component: SingleCrewComponentComponent;
  let fixture: ComponentFixture<SingleCrewComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleCrewComponentComponent]
    });
    fixture = TestBed.createComponent(SingleCrewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
