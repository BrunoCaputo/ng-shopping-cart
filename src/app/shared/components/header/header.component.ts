import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  CartService,
  ProductsService,
  UtilsService,
} from 'src/app/core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;
  isLogged = false;
  isAtCart = false;
  categories: string[] = [];

  constructor(
    private router: Router,
    public cartService: CartService,
    private productsService: ProductsService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.cartService.isAtCart().subscribe((atCart) => {
      this.isAtCart = atCart;
    });

    this.productsService.getCategories().then((cats) => {
      this.categories = cats
        .map((cat) => this.utils.captalizeFirstLetter(cat))
        .slice(0, 3);
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

  onCancel(): void {
    this.searchInput.nativeElement.value = '';
  }
}
