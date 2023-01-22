import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services';
import { ICartProduct } from 'src/app/shared/models';

@Component({
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent {
  cartProducts: ICartProduct[] = [];
  discountPercentage: number = 0;
  discount: number = 0;
  total: number = 0;
  subTotal: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.getCartProducts();
    const url: string = this.router.url;
    const currentStep = url.substring(url.indexOf('/', 2) + 1, url.length);
    this.cartService.changeStepData(currentStep);
  }

  private getCartProducts() {
    this.cartProducts = this.cartService.getCartProducts();
    this.calculateSubTotal();
  }

  cartIsEmpty(): boolean {
    return this.cartProducts.length === 0;
  }

  emptyShoppingCart() {
    this.cartService.emptyCart('clear');
  }

  changeQuantity() {
    this.calculateSubTotal();
  }

  removeProductFromCart(productId: number) {
    this.calculateSubTotal();
  }

  getDiscount(discountPercentage: number) {
    this.discountPercentage = discountPercentage;
    this.discount = this.total * (discountPercentage / 100);
  }

  calculateEstimatedTotal(): number {
    this.total = this.subTotal - this.discount;
    return this.total;
  }

  calculateSubTotal() {
    const priceArray: { price: number; quantity: number }[] =
      this.cartProducts.map((product) => {
        return { price: product.price, quantity: product.quantity };
      });

    this.subTotal = priceArray.reduce((pv, cv) => {
      return pv + cv.price * cv.quantity;
    }, 0);
  }

  goToCheckout() {
    this.cartService.setPaymentData({
      total: this.total,
      subTotal: this.subTotal,
      discount: this.discount,
      discountPercentage: this.discountPercentage,
    });
    this.router.navigate(['/cart/checkout']);
  }
}
