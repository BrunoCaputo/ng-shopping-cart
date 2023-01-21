import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services';

@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.setAtCart(this.router.url);
  }
}
