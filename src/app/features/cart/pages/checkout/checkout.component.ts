import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services';

@Component({
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  total: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    const url: string = this.router.url;
    const currentStep = url.substring(url.indexOf('/', 2) + 1, url.length);
    this.cartService.changeStepData(currentStep);

    this.total = this.cartService.getTotal();
  }

  checkout(): void {
    this.cartService.emptyCart('checkout');
    // this.cartProducts = [];
  }
}
