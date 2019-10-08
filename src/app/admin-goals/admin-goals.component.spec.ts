import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoalsComponent } from './admin-goals.component';

describe('AdminGoalsComponent', () => {
  let component: AdminGoalsComponent;
  let fixture: ComponentFixture<AdminGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
