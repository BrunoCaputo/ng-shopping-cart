import { TestBed } from '@angular/core/testing';

import { CartHttpService } from './cart-http.service';

describe('CartHttpService', () => {
  let service: CartHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
