import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/core/services';
import { IProduct } from 'src/app/shared/models';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  product?: IProduct;

  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    const id: string = this.route.snapshot.paramMap.get('prod')!;
    console.log(id);
    this.getProductData(id);
  }

  async getProductData(id: string) {
    this.product = await this.productsService.getProductById(id);
    console.log(this.product);
    this.title.setTitle(`${this.product.title} | BC Store`);
  }
}
