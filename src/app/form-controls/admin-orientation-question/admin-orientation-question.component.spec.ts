import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrientationQuestionComponent } from './admin-orientation-question.component';

describe('AdminOrientationQuestionComponent', () => {
  let component: AdminOrientationQuestionComponent;
  let fixture: ComponentFixture<AdminOrientationQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrientationQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrientationQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
