import { NgModule } from '@angular/core';

import { ProductListingRoutingModule } from './product-listing-routing.module';
import { ProductListingComponent } from './product-listing.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CatalogModule } from '../../catalog.module';

@NgModule({
  declarations: [ProductListingComponent],
  imports: [SharedModule, ProductListingRoutingModule, CatalogModule],
})
export class ProductListingModule {}
