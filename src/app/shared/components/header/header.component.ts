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

  constructor(
    private router: Router,
    public cartService: CartService,
    private productsService: ProductsService,
    private utils: UtilsService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
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

  loginOrLogout() {
    if (!this.isLogged) {
      this.router.navigate(['/login']);
    } else {
      this.authService.logout();
      this.isLogged = false;
    }
  }
}
