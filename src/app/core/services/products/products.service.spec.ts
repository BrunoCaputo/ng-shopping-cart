import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { ProductsService } from './products.service';

describe('ProductsService', () => {
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

  it('products/categories API should contain GET method', async () => {
    service.getCategories().then((res) => console.log(res));

    const http = httpController.expectOne(
      `${environment.apiBaseUrl}/products/categories`,
      'Get all categories from API'
    );
    expect(http.request.method).toBe('GET');
  });

  afterEach(() => {
    httpController.verify();
  });
});
