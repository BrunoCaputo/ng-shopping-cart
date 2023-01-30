import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertService } from 'src/app/core/services';

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

  constructor(private alert: AlertService) {}

  changeQuantity(action: string) {
    if (this.quantity === this.maxQuantity && action === 'add') {
      this.alert.createWarningDialog(
        "Can't add more",
        `Only ${this.maxQuantity} left!`
      );
      return;
    }

    this.quantity = action === 'add' ? this.quantity + 1 : this.quantity - 1;

    this.onQuantityChange.emit({ quantity: this.quantity, action });
  }
}
