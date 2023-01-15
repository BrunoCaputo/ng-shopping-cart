import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService, CartService } from 'src/app/core/services';
import { IProduct } from 'src/app/shared/models';

@Component({
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent {
  categories: string[] = [];
  productsByCategory: { [key: string]: IProduct[] } = {};

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.setAtCart(this.router.url);
    this.getProducts();
  }

  async getProducts() {
    this.categories = this.productsService.getCategories();

    this.categories.forEach((category) => {
      const products = this.productsService.getProductByCategory(category);
      this.productsByCategory[category] = products;
    });
  }
}
