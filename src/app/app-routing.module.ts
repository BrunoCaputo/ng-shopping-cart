import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
  { path: 'resume', loadChildren: () => import('./features/cart/pages/resume/resume.module').then(m => m.ResumeModule) },
  { path: 'checkout', loadChildren: () => import('./features/cart/pages/checkout/checkout.module').then(m => m.CheckoutModule) },
  { path: 'confirmation', loadChildren: () => import('./features/cart/pages/confirmation/confirmation.module').then(m => m.ConfirmationModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
