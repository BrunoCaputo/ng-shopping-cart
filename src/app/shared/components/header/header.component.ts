import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  CartService,
  ProductsService,
  UtilsService,
  AuthService,
} from 'src/app/core/services';
import { User } from '../../models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;
  isLogged = false;
  isAtCart = false;
  categories: string[] = [];
  loggedUser: User | null = null;

  constructor(
    private router: Router,
    public cartService: CartService,
    private productsService: ProductsService,
    private utils: UtilsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cartService.isAtCart().subscribe((atCart) => {
      this.isAtCart = atCart;
    });

    this.productsService.getCategories().then((cats) => {
      this.categories = cats
        .map((cat) => this.utils.captalizeFirstLetter(cat))
        .slice(0, 3);
    });

    this.isLogged = this.authService.isLoggedIn();
    this.loggedUser = this.authService.getUser();
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToMainPage() {
    this.router.navigate(['/']);
  }

  onCancel(): void {
    this.searchInput.nativeElement.value = '';
  }

  goToAccountManagement(isAdmin: boolean) {
    let route: string = '/account';
    if (isAdmin) {
      route += '/admin';
    }

    this.router.navigate([route]);
  }

  loginOrLogout() {
    if (!this.isLogged) {
      this.router.navigate(['/login']);
    } else {
      this.authService.logout();
      this.isLogged = false;
      this.loggedUser = null;
      if (this.router.url.includes('account')) {
        this.router.navigate(['/']);
      }
    }
  }

  search(search: { filter?: string; category?: string }) {
    if (search.filter === '' || search.category === '') {
      return;
    }

    const params = search.filter
      ? { filter: search.filter.toLowerCase() }
      : { category: search.category?.toLocaleLowerCase() };
    this.router.navigate(['/products/search'], {
      queryParams: params,
    });
  }
}
