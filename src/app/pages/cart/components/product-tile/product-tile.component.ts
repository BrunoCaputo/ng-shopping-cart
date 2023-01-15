import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from 'src/app/core/services';
import { PRODUCTS } from 'src/app/shared/constants';
import { IProduct } from 'src/app/shared/models';

@Component({
  selector: 'product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.scss'],
})
export class ProductTileComponent {
  @Input() product!: IProduct;
  @Input() position: number = 0;
  @Input() quantity: number = 0;

  @Output() onChangeQuantity: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRemoveProduct: EventEmitter<any> = new EventEmitter<any>();

  maxQuantity: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.maxQuantity =
      PRODUCTS.find((prod) => prod.id === this.product.id)?.quantity ?? 0;
  }

  getPrice(): string {
    return (this.product.price * this.quantity).toFixed(2);
  }

  changeQuantity(newQuantity: number, action: string) {
    if (action === 'add') {
      this.cartService.addProductToCart(this.product);
    } else {
      this.cartService.removeProductFromCart(this.product.id);
    }

    this.quantity = newQuantity;
    this.onChangeQuantity.emit('');
  }

  removeProduct() {
    this.cartService.removeProductFromCart(
      this.product.id,
      this.quantity === 0 ? 1 : this.quantity
    );
    this.onRemoveProduct.emit('');
  }
}
