import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'quantity-changer',
  templateUrl: './quantity-changer.component.html',
  styleUrls: ['./quantity-changer.component.scss'],
})
export class QuantityChangerComponent {
  @Input() maxQuantity: number = 5;
  @Output() onQuantityChange: EventEmitter<number> = new EventEmitter<number>();

  quantity: number = 1;

  constructor() {}

  changeQuantity(action: string) {
    if (this.quantity === this.maxQuantity && action === 'add') {
      alert(`Only ${this.maxQuantity} left! Can't add more.`);
      return;
    }

    this.quantity = action === 'add' ? this.quantity + 1 : this.quantity - 1;

    this.onQuantityChange.emit(this.quantity);
  }
}
