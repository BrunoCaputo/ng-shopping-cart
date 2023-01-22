import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services';

@Component({
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent {
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    const url: string = this.router.url;
    const currentStep = url.substring(url.indexOf('/', 2) + 1, url.length);
    this.cartService.changeStepData(currentStep);
  }

  confirm(): void {
    this.cartService.emptyCart('confirm');
  }
}
