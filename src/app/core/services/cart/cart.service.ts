import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private isAtCart$: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  isAtCart(): Subject<boolean> {
    return this.isAtCart$;
  }

  setAtCart(routeName: string): void {
    this.isAtCart$.next(routeName === '/cart');
  }
}
