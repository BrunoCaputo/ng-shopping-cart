import { NgModule } from '@angular/core';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AccountComponent],
  imports: [SharedModule, AccountRoutingModule],
})
export class AccountModule {}
