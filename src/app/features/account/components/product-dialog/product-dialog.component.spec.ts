import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProductDialogComponent } from './product-dialog.component';

describe('ProductDialogComponent', () => {
  let component: ProductDialogComponent;
  let fixture: ComponentFixture<ProductDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDialogComponent],
      imports: [HttpClientTestingModule, SharedModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('form should be invalid when empty', () => {
    expect(component.productForm.valid).toBeFalsy();
  });

  it('stock field validity', () => {
    const stock = component.productForm.controls['stock'];

    stock.setValue('');
    expect(stock.hasError('required')).toBeTruthy();

    stock.setValue(-1);
    expect(stock.hasError('min')).toBeTruthy();

    stock.setValue(0);
    expect(stock.valid).toBeTruthy();
  });

  it('should set the price field to invalid if the value is negative', () => {
    const price = component.productForm.controls['price'];

    price.setValue(-1);
    expect(price.valid).toBeFalsy();
  });
});
