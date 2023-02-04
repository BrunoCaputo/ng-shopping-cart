import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilsService } from 'src/app/core/services';
import { States } from 'src/app/shared/constants';
import { IPostmonApiResponse, IState } from 'src/app/shared/models';

@Component({
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.scss'],
})
export class AddressDialogComponent {
  addressForm!: FormGroup;
  stateOpts: IState[] = [];

  constructor(
    private utils: UtilsService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public addressData?: FormGroup
  ) {}

  ngOnInit() {
    this.stateOpts = Object.keys(States).map((st) => ({
      uf: st,
      name: States[st].name,
    }));

    this.addressForm =
      this.addressData ??
      this.fb.group({
        zipCode: ['', [Validators.required]],
        street: ['', [Validators.required]],
        complement: [''],
        neighborhood: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
      });
  }

  async getAddressFromZipCode(zipCode: string) {
    if (zipCode.trim() === '') {
      this.addressForm.get('zipCode')?.setErrors({
        required: true,
      });
    }

    try {
      zipCode = zipCode.replace('-', '').trim();
      const address: IPostmonApiResponse = await this.utils.getDataFromZipCode(
        zipCode
      );
      this.fillAddress(address);
    } catch (err) {
      this.addressForm.get('zipCode')?.setErrors({
        invalidZipCode: true,
      });
    }
  }

  private fillAddress(address: IPostmonApiResponse) {
    const addressGroupControl = this.addressForm.controls;

    addressGroupControl['city']?.setValue(address.cidade);
    addressGroupControl['state']?.setValue(address.estado);
    addressGroupControl['neighborhood']?.setValue(address.bairro);
    addressGroupControl['street']?.setValue(address.logradouro);
  }

  apply() {
    this.dialogRef.close(this.addressForm.getRawValue());
  }
}
