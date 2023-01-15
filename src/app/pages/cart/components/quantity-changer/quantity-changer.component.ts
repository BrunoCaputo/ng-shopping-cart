import { Component, EventEmitter, Input, Output } from '@angular/core';

interface IOnQttChange {
  quantity: number;
  action: string;
}

@Component({
  selector: 'quantity-changer',
  templateUrl: './quantity-changer.component.html',
  styleUrls: ['./quantity-changer.component.scss'],
})
export class QuantityChangerComponent {
  @Input() quantity: number = 0;
  @Input() maxQuantity: number = 0;
  @Output() onQuantityChange: EventEmitter<IOnQttChange> =
    new EventEmitter<IOnQttChange>();

  constructor() {}

  changeQuantity(action: string) {
    if (this.quantity === this.maxQuantity && action === 'add') {
      alert(`Only ${this.maxQuantity} left! Can't add more.`);
      return;
    }

    this.quantity = action === 'add' ? this.quantity + 1 : this.quantity - 1;

    this.onQuantityChange.emit({ quantity: this.quantity, action });
  }
}
