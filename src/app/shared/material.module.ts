import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

const COMPONENTS: any[] = [
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatBadgeModule,
];

@NgModule({
  declarations: [],
  imports: COMPONENTS,
  exports: COMPONENTS,
})
export class MaterialModule {}
