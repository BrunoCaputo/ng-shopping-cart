import { NgModule } from '@angular/core';

import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { ProductDetailsComponent } from './product-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CatalogModule } from '../../catalog.module';

@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [SharedModule, ProductDetailsRoutingModule, CatalogModule],
})
export class ProductDetailsModule {}
