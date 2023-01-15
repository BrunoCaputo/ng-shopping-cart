import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLogged = false;
  isAtCart = false;

  constructor(private router: Router, public cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.isAtCart().subscribe((atCart) => {
      this.isAtCart = atCart;
    });
  }

  toggleLogin() {
    this.isLogged = !this.isLogged;
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToMainPage() {
    this.router.navigate(['/']);
  }
}
