import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, lastValueFrom } from 'rxjs';
import { IProduct, IProductsData } from 'src/app/shared/models';
import { environment } from 'src/environments/environment';
import { ProductsHttpService } from './products-http.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products: IProduct[] = [];

  constructor(private productsHttp: ProductsHttpService) {}

  setProducts(products: IProduct[]): void {
    this.products = products;
  }

  async getCategories(): Promise<string[]> {
    let categories: string[] = [];

    if (sessionStorage.getItem('categories') === null) {
      categories = await lastValueFrom(this.productsHttp.getCategories());
      sessionStorage.setItem('categories', JSON.stringify(categories));
      return categories;
    }

    return JSON.parse(sessionStorage.getItem('categories')!);
  }

  async getProducts(limit: number = 100): Promise<IProduct[]> {
    if (this.products.length > 0) {
      return this.products;
    }
    const { products } = await lastValueFrom(
      this.productsHttp.getProducts(limit)
    );

    this.products = products;
    return this.products;
  }

  getProductByCategory(
    category: string,
    limit: number = 20
  ): Promise<IProductsData> {
    return lastValueFrom(
      this.productsHttp.getProductByCategory(category, limit)
    );
  }

  async getProductById(id: string): Promise<IProduct> {
    if (this.products.length > 0) {
      return (
        this.products.find((product) => product.id.toString() === id) ??
        this.products[Number(id) - 1]
      );
    }
    return lastValueFrom(this.productsHttp.getProductById(id));
  }
}
