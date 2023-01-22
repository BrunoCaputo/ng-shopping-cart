import { NgModule } from '@angular/core';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartModule } from '../../cart.module';

@NgModule({
  declarations: [CheckoutComponent],
  imports: [SharedModule, CheckoutRoutingModule, CartModule],
})
export class CheckoutModule {}
