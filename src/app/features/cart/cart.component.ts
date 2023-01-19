import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services';
import { IProduct } from 'src/app/shared/models';

@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cartProducts: IProduct[] = [];
  discount: number = 0;
  discountPercentage: number = 0;
  shippingCost: number = 0;
  total: number = 0;
  estTotal: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.setAtCart(this.router.url);
    this.getCartProducts();
  }

  private getCartProducts() {
    this.cartProducts = this.cartService.getCartProducts();
    this.calculateTotal();
  }

  cartIsEmpty(): boolean {
    return this.cartProducts.length === 0;
  }

  emptyShoppingCart() {
    this.cartService.emptyCart('clear');
  }

  changeQuantity() {
    this.calculateTotal();
  }

  removeProductFromCart(productId: number) {
    this.calculateTotal();
  }

  getDiscount(discountPercentage: number) {
    this.discountPercentage = discountPercentage;
    this.discount = this.total * (discountPercentage / 100);
  }

  calculateTotal() {
    const priceArray: { price: number; quantity: number }[] =
      this.cartProducts.map((product) => {
        return { price: product.price, quantity: product.quantity };
      });

    this.total = priceArray.reduce((pv, cv) => {
      return pv + cv.price * cv.quantity;
    }, 0);
  }

  calculateEstimatedTotal(): string {
    this.estTotal = this.total + this.shippingCost - this.discount;
    return this.estTotal.toFixed(2);
  }

  checkout(): void {
    alert(`Your order: \$${this.estTotal.toFixed(2)}`);

    this.cartService.emptyCart('checkout');
    this.cartProducts = [];
  }
}