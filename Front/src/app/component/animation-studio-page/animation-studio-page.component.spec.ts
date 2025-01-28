import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationStudioPageComponent } from './animation-studio-page.component';

describe('AnimationStudioPageComponent', () => {
  let component: AnimationStudioPageComponent;
  let fixture: ComponentFixture<AnimationStudioPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimationStudioPageComponent]
    });
    fixture = TestBed.createComponent(AnimationStudioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
