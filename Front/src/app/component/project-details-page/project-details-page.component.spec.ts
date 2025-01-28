import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsPageComponent } from './project-details-page.component';

describe('ProjectDetailsPageComponent', () => {
  let component: ProjectDetailsPageComponent;
  let fixture: ComponentFixture<ProjectDetailsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectDetailsPageComponent]
    });
    fixture = TestBed.createComponent(ProjectDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
