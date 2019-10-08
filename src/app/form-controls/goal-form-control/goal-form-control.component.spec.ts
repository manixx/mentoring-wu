import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalFormControlComponent } from './goal-form-control.component';

describe('GoalFormControlComponent', () => {
  let component: GoalFormControlComponent;
  let fixture: ComponentFixture<GoalFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalFormControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
