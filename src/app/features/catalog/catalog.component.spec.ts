import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ProductsService } from 'src/app/core/services';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';
import { OrderLineComponent } from '../cart/components/order-line/order-line.component';

import { CatalogComponent } from './catalog.component';
import { CategoryContainerComponent } from './components/category-container/category-container.component';

describe('CatalogComponent', () => {
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
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    httpController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ProductsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('categories should not be empty', (done) => {
    let categories: string[];
    service.getCategories().then((cats) => {
      categories = cats;
      expect(cats).toBeGreaterThan(0);
      done();
    });
  });

  it('should group products by category', (done) => {
    let categories: string[] = [];
    service.getCategories().then((cats) => {
      categories = cats;
      done();
    });

    const http = httpController.expectOne(
      `${environment.apiBaseUrl}/products/categories`
    );

    component.categories = categories;
    component.getProducts();

    expect(component.productsByCategory[categories[0]].length).toBeGreaterThan(
      0
    );
  });
});
