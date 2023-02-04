import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsService } from 'src/app/core/services';
import { SharedModule } from 'src/app/shared/shared.module';
import { categoriesMock, productsMock } from 'src/app/tests/mocks';
import { environment } from 'src/environments/environment';
import { OrderLineComponent } from '../cart/components/order-line/order-line.component';

import { CatalogComponent } from './catalog.component';
import { CategoryContainerComponent } from './components/category-container/category-container.component';

describe('CatalogComponent', () => {
  const apiUrl: string = `${environment.apiBaseUrl}/products`;
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  let httpController: HttpTestingController;
  let service: ProductsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CatalogComponent,
        CategoryContainerComponent,
        OrderLineComponent,
      ],
      imports: [SharedModule, HttpClientTestingModule],
      providers: [ProductsService],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    httpController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ProductsService);
    fixture.detectChanges();
  });

  it('should have a banner in home page', () => {
    const doc = fixture.nativeElement as HTMLElement;
    const banner = doc.querySelector('img');
    const bannerSrc = banner?.src;

    expect(banner).toBeTruthy();
    expect(bannerSrc).toContain('assets/images/banner.png');
  });

  it('categories should not be empty', async () => {
    service.getCategories().then((categories) => {
      expect(categories.length).toBeGreaterThan(0);
    });

    const http = httpController.match(`${apiUrl}/categories`);
    http.map((request) => request.flush(categoriesMock));

    http.map((req) => expect(req.request.method).toBe('GET'));
    httpController.verify();
  });

  it('should products length at least 8', async () => {
    service.getProducts().then((products) => {
      if (!products) {
        products = productsMock;
      }
      expect(products.length).toBeGreaterThanOrEqual(8);
    });

    const http = httpController.expectOne(`${apiUrl}?limit=100`);

    if (!!sessionStorage.getItem('categories')) {
      httpController.expectNone(`${apiUrl}/categories`);
    } else {
      httpController.expectOne(`${apiUrl}/categories`);
    }

    http.flush(productsMock);
    expect(http.request.method).toBe('GET');
    httpController.verify();
  });
});
