import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services';
import { IPaymentMethod } from '../../models';

@Component({
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  total: number = 0;
  paymentMethodForm!: FormGroup;

  paymentMethods: IPaymentMethod[] = [
    { method: 'Credit Card', discountPercentage: 0 },
    { method: 'Debit Card', discountPercentage: 0 },
    { method: 'PIX', discountPercentage: 15 },
    { method: 'Bank Billet', discountPercentage: 10 }, // Boleto
  ];

  constructor(
    private cartService: CartService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const url: string = this.router.url;
    const currentStep = url.substring(url.indexOf('/', 2) + 1, url.length);
    this.cartService.changeStepData(currentStep);

    this.paymentMethodForm = this.fb.group({
      method: ['', [Validators.required]],
    });

    this.total = this.cartService.getPaymentData()['total'];
  }

  confirmOrder() {
    if (this.paymentMethodForm.valid) {
      const formValue = this.paymentMethodForm.getRawValue();
      const paymentMethod: IPaymentMethod =
        this.paymentMethods[Number(formValue['method'])];

      this.router.navigate(['/cart/confirmation']);
      this.cartService.setPaymentMethod(paymentMethod);
      this.cartService.checkOut();
    }
  }
}
