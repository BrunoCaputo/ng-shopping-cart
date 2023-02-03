import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'admin', pathMatch: 'full', redirectTo: '/account/admin' },
  {
    path: 'login',
    loadChildren: () =>
      import('src/app/features/login/login.module').then((m) => m.LoginModule),
    title: 'Login | BC Store',
  },
  {
    path: 'account-creation',
    loadChildren: () =>
      import('src/app/features/account-creation/account-creation.module').then(
        (m) => m.AccountCreationModule
      ),
    title: 'Create your account | BC Store',
  },
  {
    path: '',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
