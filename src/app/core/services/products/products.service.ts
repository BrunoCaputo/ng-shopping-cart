import { Injectable } from '@angular/core';
import {
  CATEGORIES,
  PRODUCTS,
} from 'src/app/shared/constants/products.constant';
import { IProduct } from 'src/app/shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}

  getCategories(): string[] {
    return CATEGORIES;
  }

  getProducts(): IProduct[] {
    return PRODUCTS;
  }

  getProductByCategory(category: string): IProduct[] {
    return PRODUCTS.filter((product) => product.category === category);
  }

  getProductById(id: number): IProduct | undefined {
    return PRODUCTS.find((product) => product.id === id);
  }
}
