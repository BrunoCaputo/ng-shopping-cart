import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { CatalogRoutingModule } from './catalog-routing.module';

import { CatalogComponent } from './catalog.component';
import * as components from './components';

@NgModule({
  declarations: [CatalogComponent, ...components.catalogComponents],
  imports: [SharedModule, CatalogRoutingModule],
  exports: [...components.catalogComponents],
})
export class CatalogModule {}
