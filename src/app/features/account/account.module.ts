import { NgModule } from '@angular/core';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { SharedModule } from 'src/app/shared/shared.module';
import * as components from './components';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@NgModule({
  declarations: [AccountComponent, ...components.accountComponents],
  imports: [SharedModule, AccountRoutingModule, NgxMaskDirective, NgxMaskPipe],
  exports: [...components.accountComponents, NgxMaskDirective, NgxMaskPipe],
})
export class AccountModule {}
