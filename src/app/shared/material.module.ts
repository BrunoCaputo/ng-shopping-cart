import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const COMPONENTS: any[] = [
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
];

@NgModule({
  declarations: [],
  imports: COMPONENTS,
  exports: COMPONENTS,
})
export class MaterialModule {}
