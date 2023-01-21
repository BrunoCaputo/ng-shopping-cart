import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { STEPS } from 'src/app/features/cart/constants';
import { IOrderStep } from 'src/app/features/cart/models';
import { ICartProduct, IProduct } from 'src/app/shared/models';
import { ProductsService } from '../products/products.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private isAtCart$: Subject<boolean> = new Subject<boolean>();
  private cartProducts: ICartProduct[] = [];
  private steps: IOrderStep[] = [...STEPS];
  private total: number = 0;

  constructor(private productService: ProductsService) {}

  getSteps(): IOrderStep[] {
    return this.steps;
  }

  changeStepData(currentStep: string) {
    const step = this.steps.find(
      (stp) => stp.title.toLowerCase() === currentStep
    );
    if (step) {
      step.current = true;
      const curStepPosition = step.step;
      for (let i in Array(curStepPosition - 1).fill('')) {
        const index = Number(i);
        this.steps[index].current = false;
        this.steps[index].completed = true;
      }
    }
  }

  resetStepsData() {
    this.steps = [...STEPS];
  }

  isAtCart(): Subject<boolean> {
    return this.isAtCart$;
  }

  setAtCart(routeName: string): void {
    this.isAtCart$.next(routeName.includes('/cart'));
  }

  getCartProducts(): ICartProduct[] {
    return this.cartProducts;
  }

  private getProductFromList(productId: number): ICartProduct | undefined {
    return this.cartProducts.find((prod) => prod.id === productId);
  }

  removeProductFromCart(productId: number, quantity: number = 1): void {
    // Check if product exists in cart
    const arrayProd: ICartProduct | undefined =
      this.getProductFromList(productId);
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

  addProductToCart(product: ICartProduct): void {
    // Check if product exists in cart
    const arrayProd: ICartProduct | undefined = this.getProductFromList(
      product.id
    );
    if (arrayProd !== undefined) {
      arrayProd.quantity++;
    } else {
      this.cartProducts.push({ ...product, quantity: 1 });
    }

    this.changeMainList(product.id, 'add');
  }

  changeMainList(productId: number, action: string, quantity: number = 1) {
    const product: IProduct = this.productService
      .getUsedProducts()
      .find((prod) => prod.id === productId)!;
    product.stock =
      action === 'add' ? product.stock - quantity : product.stock + quantity;
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

  getTotal(): number {
    return this.total;
  }

  setTotal(total: number) {
    this.total = total;
  }
}
