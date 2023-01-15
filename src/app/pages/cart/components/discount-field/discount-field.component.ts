import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COUPONS } from 'src/app/shared/constants';

interface IPaymentMethod {
  method: string;
  discountPercentage: number;
}

@Component({
  selector: 'discount-field',
  templateUrl: './discount-field.component.html',
  styleUrls: ['./discount-field.component.scss'],
})
export class DiscountFieldComponent {
  discountForm!: FormGroup;

  @Output() onDiscountPercentage: EventEmitter<number> =
    new EventEmitter<number>();

  paymentMethods: IPaymentMethod[] = [
    { method: 'Credit Card', discountPercentage: 0 },
    { method: 'Debit Card', discountPercentage: 0 },
    { method: 'PIX', discountPercentage: 15 },
    { method: 'Bank Billet', discountPercentage: 10 }, // Boleto
  ];

  paymentMethodDiscount: number = 0;
  discountPercentage: number = 0;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.discountForm = this.fb.group({
      paymentMethodDiscount: [null, [Validators.required]],
      coupon: '',
    });
  }

  validateCoupon(coupon: string) {
    if (coupon === '') {
      return true;
    }

    return COUPONS.map((coup) => coup.name).includes(coupon);
  }

  applyCoupon() {
    const formValue = this.discountForm.getRawValue();
    this.paymentMethodDiscount = formValue['paymentMethodDiscount'];
    const coupon: string = formValue['coupon'];

    if (this.validateCoupon(coupon)) {
      this.discountPercentage =
        COUPONS.find((coup) => coup.name === coupon)?.discountPercentage ?? 0;
    } else {
      this.discountForm.controls['coupon'].setErrors({
        invalidCoupon: true,
      });
    }

    if (this.discountForm.valid) {
      this.discountPercentage += this.paymentMethodDiscount;
      this.onDiscountPercentage.emit(this.discountPercentage);
    }
  }
}
