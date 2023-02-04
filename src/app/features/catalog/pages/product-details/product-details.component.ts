import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService, ProductsService } from 'src/app/core/services';
import { ICartProduct, IProduct } from 'src/app/shared/models';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  product?: IProduct;
  favorited: boolean = false;
  quantity: number = 1;
  stock: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const id: string = this.route.snapshot.paramMap.get('prod')!;
    this.cartService.setAtCart(this.router.url);
    this.getProductData(id);
  }

  async getProductData(id: string) {
    this.product = await this.productsService.getProductById(id);
    this.stock = this.product.stock;
    this.title.setTitle(`${this.product.title} | BC Store`);
  }

  addToCart() {
    const cartProduct: ICartProduct = {
      id: this.product!.id,
      title: this.product!.title,
      price: this.product!.price,
      quantity: this.quantity,
      total: this.product!.price * this.quantity,
      discountedPrice: 0,
      discountPercentage: this.product!.discountPercentage,
      image: this.product!.thumbnail,
    };
    this.cartService.addProductToCart(cartProduct, this.quantity);
  }

  changeStockQtt(qtt: number) {
    this.product!.stock = this.stock - qtt;
  }
}
