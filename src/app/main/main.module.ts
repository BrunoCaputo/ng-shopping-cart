import { NgModule } from '@angular/core';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MainComponent],
  imports: [SharedModule, MainRoutingModule],
})
export class MainModule {}
