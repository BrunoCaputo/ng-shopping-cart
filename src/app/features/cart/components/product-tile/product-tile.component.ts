import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService, ProductsService } from 'src/app/core/services';
import { ICartProduct, IProduct } from 'src/app/shared/models';

@Component({
  selector: 'product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.scss'],
})
export class ProductTileComponent {
  @Input() product!: ICartProduct;
  @Input() position: number = 0;
  @Input() quantity: number = 0;
  @Input() hasActions: boolean = true;

  @Output() onChangeQuantity: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRemoveProduct: EventEmitter<any> = new EventEmitter<any>();

  maxQuantity: number = 0;

  constructor(
    private cartService: CartService,
    private productService: ProductsService
  ) {}

  ngOnInit() {
    this.productService.getProducts().then((products) => {
      this.maxQuantity =
        (products.find((prod) => prod.id === this.product.id)?.stock ?? 0) +
        this.quantity;
    });
  }

  getPrice(): number {
    return this.product.price * this.quantity;
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
