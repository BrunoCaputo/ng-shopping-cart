import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CartGuard } from './cart.guard';

describe('CartGuard', () => {
  let guard: CartGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    guard = TestBed.inject(CartGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
