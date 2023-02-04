import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AlertService, AuthService } from '../../services';
import { RouteGuard } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alert: AlertService
  ) {}

  private checkLogin(fromUrl: string): boolean {
    if (this.authService.isLoggedIn() || this.authService.hasLoggedUser()) {
      return true;
    }

    this.alert.createWarningDialog(
      'You are not logged in!',
      'You need to be logged to access this page'
    );
    this.router.navigate(['/login'], { queryParams: { from: fromUrl } });
    return false;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): RouteGuard {
    if (!state.url.includes('admin')) {
      return this.checkLogin(state.url);
    }

    return this.checkLogin(state.url) && this.authService.isAdmin();
  }
}
