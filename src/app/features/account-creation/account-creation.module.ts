import { NgModule } from '@angular/core';

import { AccountCreationRoutingModule } from './account-creation-routing.module';
import { AccountCreationComponent } from './account-creation.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [AccountCreationComponent],
  imports: [
    SharedModule,
    AccountCreationRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [provideNgxMask()],
})
export class AccountCreationModule {}
