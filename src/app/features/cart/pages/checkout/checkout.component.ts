import { Component } from '@angular/core';
import { CartService } from 'src/app/core/services';

@Component({
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  discountPercentage: number = 0;
  discount: number = 0;
  shippingCost: number = 0;
  total: number = 0;
  estTotal: number = 0;

  constructor(private cartService: CartService) {}

  getDiscount(discountPercentage: number) {
    this.discountPercentage = discountPercentage;
    this.discount = this.total * (discountPercentage / 100);
  }

  cartIsEmpty(): boolean {
    return false;
    // return this.cartProducts.length === 0;
  }

  calculateTotal() {
    // const priceArray: { price: number; quantity: number }[] =
    //   this.cartProducts.map((product) => {
    //     return { price: product.price, quantity: product.quantity };
    //   });
    // this.total = priceArray.reduce((pv, cv) => {
    //   return pv + cv.price * cv.quantity;
    // }, 0);
  }

  calculateEstimatedTotal(): string {
    this.estTotal = this.total + this.shippingCost - this.discount;
    return this.estTotal.toFixed(2);
  }

  checkout(): void {
    alert(`Your order: \$${this.estTotal.toFixed(2)}`);

    this.cartService.emptyCart('checkout');
    // this.cartProducts = [];
  }
}
