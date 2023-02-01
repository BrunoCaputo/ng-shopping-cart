import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from 'src/app/core/services';
import { SharedModule } from 'src/app/shared/shared.module';
import { paymentMethodsMock } from 'src/app/tests/mocks';

import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutComponent],
      imports: [
        SharedModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    cartService = TestBed.inject(CartService);
    cartService.setPaymentData({
      total: 1000,
      subTotal: 1000,
      discount: 0,
      discountPercentage: 0,
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have a payment method field', () => {
    const paymentMethodField = (
      fixture.nativeElement as HTMLElement
    ).querySelector('.payment-method mat-form-field');

    expect(paymentMethodField).toBeTruthy();

    const fieldLabel = paymentMethodField?.querySelector('mat-label');
    expect(fieldLabel?.textContent?.trim()).toEqual('Payment Method');
  });
});
