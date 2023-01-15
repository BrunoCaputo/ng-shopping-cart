import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from 'src/app/shared/models';

@Component({
  selector: 'product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.scss'],
})
export class ProductTileComponent {
  @Input() product!: IProduct;
  @Input() position: number = 0;

  @Output() onRemoveProduct: EventEmitter<any> = new EventEmitter<any>();

  quantity: number = 1;

  constructor() {}

  ngOnInit() {}

  changeQuantity(newQuantity: number) {
    if (newQuantity <= 0) {
      this.removeProduct();
      return;
    }

    this.quantity = newQuantity;
  }

  removeProduct() {
    this.onRemoveProduct.emit('');
  }
}
