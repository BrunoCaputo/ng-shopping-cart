import { Component, Input } from '@angular/core';
import { UtilsService } from 'src/app/core/services';
import { IProduct } from 'src/app/shared/models';

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
    this.name = this.utils.captalizeFirstLetter(this.name.replace('-', ' '));
  }
}
