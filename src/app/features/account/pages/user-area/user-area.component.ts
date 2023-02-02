import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services';
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

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser()!.userInterface;

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

    (this.user.addresses ?? []).forEach((address) => {
      this.addressesData.push(this.setAddress(address));
    });

    console.log(this.addressesData.controls[0].getRawValue());
  }

  get addressesData() {
    return <FormArray<FormGroup>>this.addressesForm.controls['addresses'];
  }

  setAddress(address: IUserAddress): FormGroup {
    const splittedAddress: string[] = address.address.split('-');
    const street: string = splittedAddress[0];
    const complement: string = splittedAddress[1] ?? '';
    const neighborhood: string =
      splittedAddress[splittedAddress.length - 1] ?? '';

    return this.fb.group({
      zipCode: [address.postalCode, [Validators.required]],
      street: [street, [Validators.required]],
      complement: [complement],
      neighborhood: [neighborhood, [Validators.required]],
      city: [address.city, [Validators.required]],
      state: [address.state, [Validators.required]],
    });
  }

  updateUserInfo() {}

  addNewAddress() {
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
}
