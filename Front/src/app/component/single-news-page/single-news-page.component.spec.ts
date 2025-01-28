import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleNewsPageComponent } from './single-news-page.component';

describe('SingleNewsPageComponent', () => {
  let component: SingleNewsPageComponent;
  let fixture: ComponentFixture<SingleNewsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleNewsPageComponent]
    });
    fixture = TestBed.createComponent(SingleNewsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
