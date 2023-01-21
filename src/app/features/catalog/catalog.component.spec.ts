import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderLineComponent } from '../cart/components/order-line/order-line.component';

import { CatalogComponent } from './catalog.component';
import { CategoryContainerComponent } from './components/category-container/category-container.component';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CatalogComponent,
        CategoryContainerComponent,
        OrderLineComponent,
      ],
      imports: [SharedModule, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
