import { NgModule } from '@angular/core';

import { NotFoundPageRoutingModule } from './not-found-page-routing.module';
import { NotFoundPageComponent } from './not-found-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [SharedModule, NotFoundPageRoutingModule],
})
export class NotFoundPageModule {}
