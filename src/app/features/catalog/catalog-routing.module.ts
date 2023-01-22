import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog.component';

const routes: Routes = [
  { path: 'details', pathMatch: 'full', redirectTo: '' },
  {
    path: '',
    component: CatalogComponent,
  },
  {
    path: 'details/:prod',
    loadChildren: () =>
      import('./pages/product-details/product-details.module').then(
        (m) => m.ProductDetailsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRoutingModule {}
