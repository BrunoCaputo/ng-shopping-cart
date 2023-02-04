import { Component, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService, ProductsService } from 'src/app/core/services';
import { IProduct } from 'src/app/shared/models';

@Component({
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent {
  products: IProduct[] = [];
  filter: string = '';
  category: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.setAtCart(this.router.url);
  }

  ngAfterContentChecked(): void {
    const filter = this.route.snapshot.queryParamMap.get('filter') ?? '';
    if (filter !== '' && this.filter !== filter) {
      this.filter = filter;
      this.getProductsFromSearch();
    }

    const category = this.route.snapshot.queryParamMap.get('category') ?? '';
    if (category !== '' && this.category !== category) {
      this.category = category;
      this.productsByCategory();
    }
  }

  async getProductsFromSearch() {
    this.products = await this.productsService.searchProducts(this.filter);
  }

  async productsByCategory() {
    this.products = await this.productsService.getProductByCategory(
      this.category
    );
  }
}
