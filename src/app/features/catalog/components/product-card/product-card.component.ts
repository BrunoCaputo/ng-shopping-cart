import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services';
import { ICartProduct, IProduct } from 'src/app/shared/models';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: IProduct;

  cartProduct!: ICartProduct;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {}

  addToCart(event: MouseEvent) {
    event.stopPropagation();
    this.cartProduct = {
      id: this.product.id,
      title: this.product.title,
      price: this.product.price,
      quantity: 1,
      total: this.product.price * 1,
      discountedPrice: 0,
      discountPercentage: this.product.discountPercentage,
      image: this.product.thumbnail,
    };
    this.cartService.addProductToCart(this.cartProduct);
  }

  isSoldOut(): boolean {
    return this.product.stock === 0;
  }

  getRemain(): string {
    if (this.product.stock === 0) {
      return 'SOLD OUT';
    }

    return `Left: ${this.product.stock}`;
  }

  openDetails(id: string) {
    this.router.navigate([`/products/details/${id}`]);
  }
}
