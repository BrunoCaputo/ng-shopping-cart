import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { ProductsService } from './products.service';

describe('ProductsService', () => {
  const apiUrl = `${environment.apiBaseUrl}/products`;
  let service: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search products by filter', () => {
    const filter = 'iphone';

    service.searchProducts(filter).then((products) => {
      expect(products.length).toBeGreaterThan(0);
    });

    const http = httpController.expectOne(
      `${apiUrl}/search?q=${filter}&limit=100`
    );

    expect(http.request.method).toBe('GET');
  });
});
