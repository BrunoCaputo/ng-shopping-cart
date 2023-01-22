import { NgModule } from '@angular/core';

import { UserAreaRoutingModule } from './user-area-routing.module';
import { UserAreaComponent } from './user-area.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [UserAreaComponent],
  imports: [SharedModule, UserAreaRoutingModule],
})
export class UserAreaModule {}
