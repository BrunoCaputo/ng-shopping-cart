import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuantityChangerComponent } from '../quantity-changer/quantity-changer.component';

import { ProductTileComponent } from './product-tile.component';

describe('ProductTileComponent', () => {
  let component: ProductTileComponent;
  let fixture: ComponentFixture<ProductTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductTileComponent, QuantityChangerComponent],
      imports: [SharedModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
