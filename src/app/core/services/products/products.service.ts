import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, lastValueFrom } from 'rxjs';
import { IProduct, IProductsData } from 'src/app/shared/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private url: string = `${environment.apiBaseUrl}/products`;
  private products: IProduct[] = [];

  constructor(private http: HttpClient) {}

  setProducts(products: IProduct[]): void {
    this.products = products;
  }

  async getCategories(): Promise<string[]> {
    let categories: string[] = [];

    if (sessionStorage.getItem('categories') === null) {
      categories = await lastValueFrom(
        this.http.get<string[]>(`${this.url}/categories`).pipe(first())
      );
      sessionStorage.setItem('categories', JSON.stringify(categories));
      return categories;
    }

    return JSON.parse(sessionStorage.getItem('categories')!);
  }

  async getProducts(limit: number = 40): Promise<IProduct[]> {
    if (this.products.length > 0) {
      return this.products;
    }
    const { products } = await lastValueFrom(
      this.http
        .get<IProductsData>(`${this.url}?limit=${limit.toString()}`)
        .pipe(first())
    );

    this.products = products;
    return this.products;
  }

  getProductByCategory(
    category: string,
    limit: number = 20
  ): Promise<IProductsData> {
    return lastValueFrom(
      this.http
        .get<IProductsData>(
          `${this.url}/category/${category}?limit=${limit.toString()}`
        )
        .pipe(first())
    );
  }

  async getProductById(id: string): Promise<IProduct> {
    if (this.products.length > 0) {
      return (
        this.products.find((product) => product.id.toString() === id) ??
        this.products[Number(id) - 1]
      );
    }
    return lastValueFrom(
      this.http.get<IProduct>(`${this.url}/${id}`).pipe(first())
    );
  }
}
