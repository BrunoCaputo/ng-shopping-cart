import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services';
import { LoadingSpinnerService } from 'src/app/core/services/spinner/loading-spinner.service';
import { IUser, IUserAddress } from 'src/app/shared/models';
import { AddressDialogComponent } from '../../components/address-dialog/address-dialog.component';

@Component({
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.scss'],
})
export class UserAreaComponent {
  personalInfoForm!: FormGroup;
  addressesForm!: FormGroup;
  user!: IUser;
  addresses: IUserAddress[] = [];

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private authService: AuthService,
    private spinner: LoadingSpinnerService
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser()!.userInterface;
    this.addresses = this.authService.getUser()!.addresses;

    this.personalInfoForm = this.fb.group({
      name: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone: [this.user.phone, [Validators.required]],
      newsLetter: [false],
    });

    this.addressesForm = this.fb.group({
      addresses: this.fb.array([]),
    });

    (this.addresses ?? []).forEach((address) => {
      this.addressesData.push(this.setAddress(address));
    });
  }

  get addressesData() {
    return <FormArray<FormGroup>>this.addressesForm.controls['addresses'];
  }

  setAddress(address: IUserAddress): FormGroup {
    const splittedAddress: string[] = address.address.split(' - ');
    const street: string = splittedAddress[0];
    const complement: string = splittedAddress[1] ?? '';
    const neighborhood: string =
      splittedAddress[splittedAddress.length - 1] ?? '';

    return this.fb.group({
      zipCode: [address.postalCode.trim(), [Validators.required]],
      street: [street.trim(), [Validators.required]],
      complement: [complement.trim()],
      neighborhood: [neighborhood.trim(), [Validators.required]],
      city: [address.city.trim(), [Validators.required]],
      state: [address.state.trim(), [Validators.required]],
    });
  }

  updateUserInfo() {
    this.spinner.show();
    const formValue = this.personalInfoForm.getRawValue();
    const user: IUser = {
      ...this.user,
      firstName: formValue['name'],
      lastName: formValue['lastName'],
      email: formValue['email'],
      phone: formValue['phone'],
    };
    this.authService.updateUserData(user);
    this.personalInfoForm.markAsPristine();
    this.spinner.hide();
  }

  updateAddresses() {
    this.authService.updateAddresses(this.addresses);
  }

  onEditAddress(editedAddress: IUserAddress, index: number) {
    this.addressesData.controls[index] = this.setAddress(editedAddress);
    this.addresses.push(editedAddress);
    this.updateAddresses();
  }

  addNewAddress() {
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newAddress: IUserAddress = {
          city: result.city,
          postalCode: result.zipCode,
          state: result.state,
          address: `${result.street} - ${result.complement} - ${result.neighborhood}`,
        };
        this.addressesData.controls.push(this.setAddress(newAddress));
        this.addresses.push(newAddress);
        this.updateAddresses();
      }
    });
  }
}
