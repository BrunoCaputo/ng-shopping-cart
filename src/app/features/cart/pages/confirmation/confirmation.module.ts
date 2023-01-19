import { NgModule } from '@angular/core';

import { ConfirmationRoutingModule } from './confirmation-routing.module';
import { ConfirmationComponent } from './confirmation.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ConfirmationComponent],
  imports: [SharedModule, ConfirmationRoutingModule],
})
export class ConfirmationModule {}
