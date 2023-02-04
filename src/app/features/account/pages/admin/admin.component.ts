import {
  ChangeDetectorRef,
  Component,
  QueryList,
  ViewChild,
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  AlertService,
  AuthService,
  ProductsService,
} from 'src/app/core/services';
import { LoadingSpinnerService } from 'src/app/core/services/spinner/loading-spinner.service';
import { IProduct, IUser } from 'src/app/shared/models';
import { ProductDialogComponent } from '../../components/product-dialog/product-dialog.component';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  productsDisplayedColumns: string[] = [
    'id',
    'title',
    'category',
    'stock',
    'price',
    'actions',
  ];
  usersDisplayedColumns: string[] = [
    'id',
    'name',
    'email',
    'username',
    'actions',
  ];
  productsDataSource!: MatTableDataSource<IProduct>;
  usersDataSource!: MatTableDataSource<IUser>;

  // table paginators
  @ViewChild('productsPaginator', { read: MatPaginator })
  productsPaginator!: MatPaginator;
  @ViewChild('usersPaginator', { read: MatPaginator })
  usersPaginator!: MatPaginator;

  // table sorts
  @ViewChild('productsSort', { read: MatSort }) productsSort!: MatSort;
  @ViewChild('usersSort', { read: MatSort }) usersSort!: MatSort;

  constructor(
    private productsService: ProductsService,
    private authService: AuthService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private spinner: LoadingSpinnerService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.productsService.getProducts().then((products) => {
      this.productsDataSource = new MatTableDataSource(products);

      this.productsDataSource.filterPredicate = this.productFilterPredicate;
      this.productsDataSource.paginator = this.productsPaginator;
      this.productsDataSource.sort = this.productsSort;
    });
  }

  ngAfterViewInit(): void {
    const nonAdminUsers: IUser[] = this.authService
      .getPlatformUsers()
      .filter((user) => user.role !== 'admin');
    this.usersDataSource = new MatTableDataSource(nonAdminUsers);
    this.cdr.detectChanges();

    this.usersDataSource.filterPredicate = this.userFilterPredicate;
    this.usersDataSource.paginator = this.usersPaginator;
    this.usersDataSource.sort = this.usersSort;
  }

  private productFilterPredicate(data: IProduct, filter: string): boolean {
    const lowerCaseFilter = filter.toLowerCase();
    return (
      data.title.toLowerCase().includes(lowerCaseFilter) ||
      data.category.toLowerCase().includes(lowerCaseFilter)
    );
  }

  private userFilterPredicate(data: IUser, filter: string): boolean {
    const lowerCaseFilter = filter.toLowerCase();
    return (
      data.firstName.toLowerCase().includes(lowerCaseFilter) ||
      data.email.toLowerCase().includes(lowerCaseFilter) ||
      data.username.toLowerCase().includes(lowerCaseFilter)
    );
  }

  openProductDialog(id?: number) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '50%',
      data: id,
    });

    dialogRef.afterClosed().subscribe(async (result: IProduct) => {
      if (result) {
        if (id) {
          try {
            this.spinner.show();
            const products = await this.productsService.updateProduct(result);
            this.productsDataSource.data = products;
            this.cdr.detectChanges();
          } catch (error) {
            console.log(error);
            this.alert.createErrorDialog('Failed to update product', '');
          } finally {
            this.spinner.hide();
          }
        } else {
          try {
            this.spinner.show();
            const products = await this.productsService.addNewProduct(result);
            this.productsDataSource.data = products;
            this.cdr.detectChanges();
          } catch (error) {
            console.log(error);
            this.alert.createErrorDialog('Failed to add a product', '');
          } finally {
            this.spinner.hide();
          }
        }
      }
    });
  }

  markUserAsAdmin(user: IUser, ev: MatCheckboxChange) {
    const checked = ev.checked;
    if (checked) {
      this.alert.createConfirmDenyDialog(
        'Change to Admin',
        `Do you want to turn ${user.firstName} to an administrator?`,
        async () => {
          this.usersDataSource.data = this.authService.changeUserToAdmin(user);
          this.cdr.detectChanges();
        },
        () => {
          ev.source.checked = false;
        }
      );
    }
  }

  applyProductsFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productsDataSource.filter = filterValue.trim().toLowerCase();

    if (this.productsDataSource.paginator) {
      this.productsDataSource.paginator.firstPage();
    }
  }

  applyUserFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usersDataSource.filter = filterValue.trim().toLowerCase();

    if (this.usersDataSource.paginator) {
      this.usersDataSource.paginator.firstPage();
    }
  }
}
