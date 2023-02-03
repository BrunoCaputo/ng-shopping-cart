import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map, Observable } from 'rxjs';
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

  getProducts(limit?: number): Observable<IProduct[]> {
    return this.http
      .get<IProductsData>(
        `${this.url}${limit ? `?limit=${limit.toString()}` : ''}`
      )
      .pipe(
        first(),
        map((data: IProductsData) => data.products)
      );
  }

  getProductByCategory(
    category: string,
    limit?: number
  ): Observable<IProduct[]> {
    return this.http
      .get<IProductsData>(
        `${this.url}/category/${category}${
          limit ? `?limit=${limit.toString()}` : ''
        }`
      )
      .pipe(
        first(),
        map((data: IProductsData) => data.products)
      );
  }

  getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/${id}`).pipe(first());
  }

  search(filter: string): Observable<IProduct[]> {
    return this.http
      .get<IProductsData>(`${this.url}/search?q=${filter}&limit=100`)
      .pipe(
        first(),
        map((data: IProductsData) => data.products)
      );
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    const { id, ...prod } = product;
    return this.http
      .put<IProduct>(`${this.url}/${id.toString()}`, prod)
      .pipe(first());
  }

  addNewProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.url}/add`, product).pipe(
      first(),
      map((data: IProduct) => ({ ...data, id: product.id }))
    );
  }
}
