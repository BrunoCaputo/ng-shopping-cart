import { Component, Input } from '@angular/core';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { IProduct } from 'src/app/shared/models/product.model';

@Component({
  selector: 'category-container',
  templateUrl: './category-container.component.html',
  styleUrls: ['./category-container.component.scss'],
})
export class CategoryContainerComponent {
  @Input() name: string = '';
  @Input() products: IProduct[] = [];

  constructor(private utils: UtilsService) {}

  ngOnInit() {
    this.name = this.utils.captalizeFirstLetter(this.name);
  }
}
