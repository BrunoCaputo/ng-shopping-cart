import { Component } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { IProduct } from 'src/app/shared/models/product.model';

@Component({
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent {
  categories: string[] = [];
  productsByCategory: { [key: string]: IProduct[] } = {};

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.getProducts();
  }

  async getProducts() {
    this.categories = this.productsService.getCategories();

    this.categories.forEach((category) => {
      const products = this.productsService.getProductByCategory(category);
      this.productsByCategory[category] = products;
    });

    console.log(this.productsByCategory);
  }
}
