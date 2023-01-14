import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
  { path: 'catalog', loadChildren: () => import('./pages/catalog/catalog.module').then(m => m.CatalogModule) },
  { path: 'cart', loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
