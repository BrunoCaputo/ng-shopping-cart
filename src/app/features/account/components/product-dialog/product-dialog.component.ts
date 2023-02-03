import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService, UtilsService } from 'src/app/core/services';
import { IProduct } from 'src/app/shared/models';

@Component({
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
})
export class ProductDialogComponent {
  productForm!: FormGroup;
  categories: string[] = [];
  product?: IProduct;

  constructor(
    private utils: UtilsService,
    private productsService: ProductsService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public id?: number
  ) {}

  ngOnInit() {
    this.productsService
      .getCategories()
      .then(
        (categories) =>
          (this.categories = categories.map((category) =>
            this.utils.captalizeFirstLetter(category)
          ))
      );

    this.productForm = this.fb.group({
      title: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      images: [[]],
    });
    this.initProductForm();
  }

  private async initProductForm(): Promise<any> {
    if (this.id) {
      this.product = await this.productsService.getProductById(
        this.id.toString()
      );

      const formControls = this.productForm.controls;
      formControls['title'].setValue(this.product.title);
      formControls['brand'].setValue(this.product.brand);
      formControls['category'].setValue(this.product.category);
      formControls['description'].setValue(this.product.description);
      formControls['price'].setValue(this.product.price);
      formControls['stock'].setValue(this.product.stock);
      formControls['images'].setValue(this.product.images);
    }
  }

  private async convertFormValueToProduct(formValue: any): Promise<IProduct> {
    if (this.product) {
      return {
        ...this.product!,
        title: formValue['title'],
        brand: formValue['brand'],
        category: formValue['category'],
        stock: formValue['stock'],
        price: formValue['price'],
        description: formValue['description'],
      };
    }

    return {
      id: (await this.productsService.getProducts()).length + 1,
      title: formValue['title'],
      brand: formValue['brand'],
      category: formValue['category'],
      stock: formValue['stock'],
      price: formValue['price'],
      description: formValue['description'],
      discountPercentage: 0,
      images: [],
      rating: 0,
      thumbnail: '',
    };
  }

  async apply() {
    const product: IProduct = await this.convertFormValueToProduct(
      this.productForm.getRawValue()
    );
    this.dialogRef.close(product);
  }
}
