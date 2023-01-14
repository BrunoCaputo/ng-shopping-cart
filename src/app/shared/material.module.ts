import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

const COMPONENTS: any[] = [MatToolbarModule, MatCardModule];

@NgModule({
  declarations: [],
  imports: COMPONENTS,
  exports: COMPONENTS,
})
export class MaterialModule {}
