import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CATEGORIES, PRODUCTS } from 'src/app/shared/constants';
import { IProduct } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

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
