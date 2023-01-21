import { UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export type RouteGuard =
  | boolean
  | UrlTree
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>;
