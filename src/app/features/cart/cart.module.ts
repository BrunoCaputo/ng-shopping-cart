import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';

import { CartComponent } from './cart.component';
import * as components from './components';

@NgModule({
  declarations: [CartComponent, ...components.cartComponents],
  imports: [SharedModule, CartRoutingModule],
  exports: [...components.cartComponents],
})
export class CartModule {}
