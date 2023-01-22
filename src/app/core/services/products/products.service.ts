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
  private usedProducts: IProduct[] = [];

  constructor(private http: HttpClient) {}

  setUsedProducts(products: IProduct[]): void {
    this.usedProducts = products;
  }

  getUsedProducts(): IProduct[] {
    return this.usedProducts;
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

  getProducts(limit: number = 40): Promise<IProductsData> {
    return lastValueFrom(
      this.http
        .get<IProductsData>(`${this.url}?limit=${limit.toString()}`)
        .pipe(first())
    );
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

  getProductById(id: number): Promise<IProduct> {
    return lastValueFrom(
      this.http.get<IProduct>(`${this.url}/${id.toString()}`).pipe(first())
    );
  }
}
