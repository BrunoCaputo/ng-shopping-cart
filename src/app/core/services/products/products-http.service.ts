import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { IProduct, IProductsData } from 'src/app/shared/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsHttpService {
  private url: string = `${environment.apiBaseUrl}/products`;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/categories`).pipe(first());
  }

  getProducts(limit?: number): Observable<IProductsData> {
    return this.http
      .get<IProductsData>(
        `${this.url}${limit ? `?limit=${limit.toString()}` : ''}`
      )
      .pipe(first());
  }

  getProductByCategory(
    category: string,
    limit?: number
  ): Observable<IProductsData> {
    return this.http
      .get<IProductsData>(
        `${this.url}/category/${category}${
          limit ? `?limit=${limit.toString()}` : ''
        }`
      )
      .pipe(first());
  }

  getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/${id}`).pipe(first());
  }
}
