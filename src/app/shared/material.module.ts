import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

const COMPONENTS: any[] = [MatToolbarModule, MatCardModule, MatIconModule];

@NgModule({
  declarations: [],
  imports: COMPONENTS,
  exports: COMPONENTS,
})
export class MaterialModule {}
