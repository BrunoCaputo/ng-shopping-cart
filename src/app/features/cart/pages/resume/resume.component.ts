import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services';
import { IProduct } from 'src/app/shared/models';

@Component({
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent {
  cartProducts: IProduct[] = [];
  total: number = 0;

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

  calculateTotal() {
    const priceArray: { price: number; quantity: number }[] =
      this.cartProducts.map((product) => {
        return { price: product.price, quantity: product.quantity };
      });

    this.total = priceArray.reduce((pv, cv) => {
      return pv + cv.price * cv.quantity;
    }, 0);
  }
}
