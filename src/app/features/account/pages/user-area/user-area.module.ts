import { NgModule } from '@angular/core';

import { UserAreaRoutingModule } from './user-area-routing.module';
import { UserAreaComponent } from './user-area.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AccountModule } from '../../account.module';

@NgModule({
  declarations: [UserAreaComponent],
  imports: [
    SharedModule,
    UserAreaRoutingModule,
    AccountModule,
  ],
  providers: [provideNgxMask()],
})
export class UserAreaModule {}
