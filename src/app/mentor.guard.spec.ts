import { TestBed, async, inject } from '@angular/core/testing';

import { MentorGuard } from './mentor.guard';

describe('MentorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MentorGuard]
    });
  });

  it('should ...', inject([MentorGuard], (guard: MentorGuard) => {
    expect(guard).toBeTruthy();
  }));
});
