import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services';

@Component({
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.setAtCart(this.router.url);
  }
}
