import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { cartProductsMock } from 'src/app/tests/mocks';

import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should clear cart', () => {
    service.setCartProducts(cartProductsMock);
    expect(service.getCartProducts().length).toBeGreaterThan(0);

    service.emptyCart('');
    expect(service.getCartProducts().length).toEqual(0);
  });
});
