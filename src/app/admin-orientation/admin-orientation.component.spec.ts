import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrientationComponent } from './admin-orientation.component';

describe('AdminOrientationComponent', () => {
  let component: AdminOrientationComponent;
  let fixture: ComponentFixture<AdminOrientationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrientationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrientationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
