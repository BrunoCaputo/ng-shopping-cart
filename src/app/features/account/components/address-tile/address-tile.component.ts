import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IUserAddress } from 'src/app/shared/models';
import { AddressDialogComponent } from '../address-dialog/address-dialog.component';

@Component({
  selector: 'address-tile',
  templateUrl: './address-tile.component.html',
  styleUrls: ['./address-tile.component.scss'],
})
export class AddressTileComponent {
  @Input() addressData!: FormGroup;
  @Output() onEditAddress: EventEmitter<IUserAddress> =
    new EventEmitter<IUserAddress>();

  address: string = '';
  city: string = '';
  zipCode: string = '';
  state: string = '';

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    const formValue = this.addressData.getRawValue();
    this.address = `${formValue['street']}${
      formValue['complement'].trim() !== ''
        ? `, ${formValue['complement'].trim()}`
        : ''
    } - ${formValue['neighborhood']}`;
    this.city = formValue['city'];
    this.zipCode = formValue['zipCode'];
    this.state = formValue['state'];
  }

  openAddressDialog() {
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      width: '50%',
      data: this.addressData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const editedAddress: IUserAddress = {
          city: result.city,
          postalCode: result.zipCode,
          state: result.state,
          address: `${result.street} - ${result.complement} - ${result.neighborhood}`,
        };

        this.onEditAddress.emit(editedAddress);
      }
    });
  }
}
