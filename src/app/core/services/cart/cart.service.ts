import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PRODUCTS } from 'src/app/shared/constants';
import { IProduct } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private isAtCart$: Subject<boolean> = new Subject<boolean>();
  private cartProducts: IProduct[] = [];

  constructor() {}

  isAtCart(): Subject<boolean> {
    return this.isAtCart$;
  }

  setAtCart(routeName: string): void {
    this.isAtCart$.next(routeName === '/cart');
  }

  getCartProducts(): IProduct[] {
    return this.cartProducts;
  }

  private getProductFromList(productId: number): IProduct | undefined {
    return this.cartProducts.find((prod) => prod.id === productId);
  }

  removeProductFromCart(productId: number, quantity: number = 1): void {
    // Check if product exists in cart
    const arrayProd: IProduct | undefined = this.getProductFromList(productId);
    if (arrayProd !== undefined) {
      arrayProd.quantity -= quantity;
      if (arrayProd.quantity === 0) {
        const prodIndex = this.cartProducts.findIndex(
          (prod) => prod.id === arrayProd.id
        );
        this.cartProducts.splice(prodIndex, 1);
      }
    }

    this.changeMainList(productId, 'remove', quantity);
  }

  addProductToCart(product: IProduct): void {
    // Check if product exists in cart
    const arrayProd: IProduct | undefined = this.getProductFromList(product.id);
    if (arrayProd !== undefined) {
      arrayProd.quantity++;
    } else {
      this.cartProducts.push({ ...product, quantity: 1 });
    }

    this.changeMainList(product.id, 'add');
  }

  changeMainList(productId: number, action: string, quantity: number = 1) {
    const product: IProduct = PRODUCTS.find((prod) => prod.id === productId)!;
    product.quantity =
      action === 'add'
        ? product.quantity - quantity
        : product.quantity + quantity;
  }

  emptyCart(scope: string) {
    if (scope === 'checkout') {
      this.cartProducts = [];
      return;
    }

    [...this.cartProducts].forEach((product) => {
      this.removeProductFromCart(product.id, product.quantity);
    });
  }
}
