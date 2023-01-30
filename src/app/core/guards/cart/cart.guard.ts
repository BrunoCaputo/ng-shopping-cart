import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { CartComponent } from 'src/app/features/cart/cart.component';
import { AlertService, AuthService, CartService } from '../../services';
import { RouteGuard } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class CartGuard implements CanActivate, CanDeactivate<CartComponent> {
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private alert: AlertService
  ) {}

  canDeactivate(
    component: CartComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): RouteGuard {
    if (nextState.url.includes('/cart') || nextState.url.includes('/login')) {
      return true;
    }
    if (this.cartService.getCartProducts().length > 0) {
      return this.alert.createBooleanConfirmDialog(
        'Are you sure you want to leave your cart?',
        ''
      );
    }

    return true;
  }

  private checkLogin(fromUrl: string): boolean {
    if (this.authService.isLoggedIn()) {
      const hasProducts = this.cartService.getCartProducts().length > 0;
      if (!hasProducts) {
        this.alert.createWarningDialog(
          "You don't have products in your cart",
          'Add some items first'
        );
        this.router.navigate(['/']);
      }
      return hasProducts;
    }

    this.router.navigate(['/login'], { queryParams: { from: fromUrl } });
    return false;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): RouteGuard {
    if (!state.url.includes('confirmation')) {
      return this.checkLogin(state.url);
    }

    if (!this.cartService.hasCheckedOut()) {
      this.router.navigate(['/cart']);
      return false;
    }

    return this.checkLogin(state.url);
  }
}
