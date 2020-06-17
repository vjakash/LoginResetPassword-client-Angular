import { TestBed } from '@angular/core/testing';

import { ResetpageGuard } from './resetpage.guard';

describe('ResetpageGuard', () => {
  let guard: ResetpageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ResetpageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
