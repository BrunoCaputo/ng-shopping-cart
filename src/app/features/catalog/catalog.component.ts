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
    this.getCategories().then(async (_) => {
      if ((await this.productsService.getProducts()).length === 0) {
        this.getProducts();
      } else {
        this.fillArray();
      }
    });
  }

  async getCategories() {
    this.categories = await this.productsService.getCategories();
  }

  private async fillArray() {
    for (const category of this.categories) {
      const products = (await this.productsService.getProducts()).filter(
        (product) => product.category === category
      );
      this.productsByCategory[category] = products;
    }
  }

  async getProducts() {
    const allProducts: IProduct[] = [];
    for (const category of this.categories) {
      const products = await this.productsService.getProductByCategory(
        category
      );
      this.productsByCategory[category] = products;
      allProducts.push(...products);
    }
    this.productsService.setProducts(allProducts);
  }
}
