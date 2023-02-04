import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountModule } from '../../account.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [SharedModule, AdminRoutingModule, AccountModule],
})
export class AdminModule {}
