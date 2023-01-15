import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/core/services';
import { IProduct } from 'src/app/shared/models';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: IProduct;

  constructor(private cartService: CartService) {}

  ngOnInit() {}

  addToCart() {
    this.cartService.addProductToCart(this.product);
  }
}
