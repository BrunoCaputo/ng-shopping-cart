import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IProduct } from 'src/app/shared/models';
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
    this.products = await lastValueFrom(this.productsHttp.getProducts(limit));
    if (!!localStorage.getItem('products')) {
      this.products = [
        ...this.products,
        ...(JSON.parse(localStorage.getItem('products')!) ?? []),
      ];
    }
    return this.products;
  }

  getProductByCategory(
    category: string,
    limit: number = 20
  ): Promise<IProduct[]> {
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

  searchProducts(searchFilter: string): Promise<IProduct[]> {
    return lastValueFrom(this.productsHttp.search(searchFilter));
  }

  async updateProduct(product: IProduct): Promise<IProduct[]> {
    if (product.id <= 100) {
      const updatedProduct = await lastValueFrom(
        this.productsHttp.updateProduct(product)
      );
      const findProductIndex: number = this.products.findIndex(
        (prod) => prod.id === product.id
      );
      if (findProductIndex !== -1) {
        this.products[findProductIndex] = updatedProduct;
      }
    }

    return this.products;
  }

  async addNewProduct(product: IProduct): Promise<IProduct[]> {
    const newProduct = await lastValueFrom(
      this.productsHttp.addNewProduct(product)
    );
    this.products.push(newProduct);
    if (!!localStorage.getItem('products')) {
      const localProducts: IProduct[] = JSON.parse(
        localStorage.getItem('products')!
      );
      localProducts.push(newProduct);
      localStorage.setItem('products', JSON.stringify(localProducts));
    } else {
      localStorage.setItem('products', JSON.stringify([newProduct]));
    }

    return this.products;
  }
}
