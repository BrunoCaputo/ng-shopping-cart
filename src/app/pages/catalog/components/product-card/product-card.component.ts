import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product.model';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: IProduct;

  ngOnInit() {}

  addToCart() {}
}
