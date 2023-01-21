import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartGuard } from 'src/app/core/guards';
import { CartComponent } from './cart.component';

const routes: Routes = [
  {
    path: '',
    component: CartComponent,
    canDeactivate: [CartGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'resume' },
      {
        path: 'resume',
        loadChildren: () =>
          import('./pages/resume/resume.module').then((m) => m.ResumeModule),
        title: 'Cart Resume | BC Store',
      },
      {
        path: 'checkout',
        loadChildren: () =>
          import('./pages/checkout/checkout.module').then(
            (m) => m.CheckoutModule
          ),
        title: 'Cart Checkout | BC Store',
        canActivate: [CartGuard],
      },
      {
        path: 'confirmation',
        loadChildren: () =>
          import('./pages/confirmation/confirmation.module').then(
            (m) => m.ConfirmationModule
          ),
        title: 'Order Confirmation | BC Store',
        canActivate: [CartGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
