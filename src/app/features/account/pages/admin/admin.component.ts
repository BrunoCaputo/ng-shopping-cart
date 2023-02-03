import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
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
import { IProduct } from 'src/app/shared/models';
import { ProductDialogComponent } from '../../components/product-dialog/product-dialog.component';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  displayedColumns: string[] = [
    'id',
    'title',
    'category',
    'stock',
    'price',
    'actions',
  ];
  dataSource!: MatTableDataSource<IProduct>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
      this.dataSource = new MatTableDataSource(products);

      this.dataSource.filterPredicate = this.filterPredicate;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  private filterPredicate(data: IProduct, filter: string): boolean {
    const lowerCaseFilter = filter.toLowerCase();
    return (
      data.title.toLowerCase().includes(lowerCaseFilter) ||
      data.category.toLowerCase().includes(lowerCaseFilter)
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
            this.dataSource.data = products;
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
            this.dataSource.data = products;
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

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
