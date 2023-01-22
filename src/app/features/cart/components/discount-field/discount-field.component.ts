import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COUPONS } from 'src/app/shared/constants';

@Component({
  selector: 'discount-field',
  templateUrl: './discount-field.component.html',
  styleUrls: ['./discount-field.component.scss'],
})
export class DiscountFieldComponent {
  discountForm!: FormGroup;

  @Output() onDiscountPercentage: EventEmitter<number> =
    new EventEmitter<number>();

  discountPercentage: number = 0;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.discountForm = this.fb.group({
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
      this.onDiscountPercentage.emit(this.discountPercentage);
    } else {
      this.onDiscountPercentage.emit(0);
    }
  }
}
