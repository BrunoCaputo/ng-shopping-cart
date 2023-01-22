import { Component } from '@angular/core';
import { CartService } from 'src/app/core/services';
import { IOrderStep } from '../../models';

@Component({
  selector: 'order-line',
  templateUrl: './order-line.component.html',
  styleUrls: ['./order-line.component.scss'],
})
export class OrderLineComponent {
  steps: IOrderStep[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.steps = this.cartService.getSteps();
  }
}
