import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, UtilsService } from 'src/app/core/services';
import { ICartProduct } from 'src/app/shared/models';
import { IPaymentMethod } from '../../models';

@Component({
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent {
  orderCode: string = '';
  cartProducts: ICartProduct[] = [];
  paymentMehod?: IPaymentMethod;
  paymentData: any;

  constructor(
    private cartService: CartService,
    private router: Router,
    private utils: UtilsService
  ) {}

  ngOnInit() {
    const url: string = this.router.url;
    const currentStep = url.substring(url.indexOf('/', 2) + 1, url.length);
    this.cartService.changeStepData(currentStep);

    this.cartProducts = this.cartService.getCartProducts();
    this.orderCode = this.utils.generateRandomCode();
    this.paymentMehod = this.cartService.getPaymentMethod();
    this.paymentData = this.cartService.getPaymentData();
  }

  confirm(): void {
    this.cartService.emptyCart('confirm');
    this.router.navigate(['/']);
  }
}
