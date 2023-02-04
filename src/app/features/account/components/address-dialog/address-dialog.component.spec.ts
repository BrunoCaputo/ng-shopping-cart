import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UtilsService } from 'src/app/core/services';
import { SharedModule } from 'src/app/shared/shared.module';

import { AddressDialogComponent } from './address-dialog.component';

describe('AddressDialogComponent', () => {
  let component: AddressDialogComponent;
  let fixture: ComponentFixture<AddressDialogComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddressDialogComponent],
      imports: [HttpClientTestingModule, SharedModule, BrowserAnimationsModule],
      providers: [
        UtilsService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: FormBuilder, useValue: new FormBuilder() },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressDialogComponent);
    formBuilder = TestBed.inject(FormBuilder);
    component = fixture.componentInstance;
    component.addressData = formBuilder.group({
      zipCode: ['', [Validators.required]],
      street: ['', [Validators.required]],
      complement: [''],
      neighborhood: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
    });
    fixture.detectChanges();
  });

  it('should have a defined addressForm', () => {
    expect(component.addressForm).toBeDefined();
  });

  it('should have a title', () => {
    const dialogTitle = fixture.nativeElement.querySelector(
      '.mat-mdc-dialog-title'
    );

    expect(dialogTitle).toBeTruthy();
  });

  it('should have a content', () => {
    const dialogContent = fixture.nativeElement.querySelector(
      '.mat-mdc-dialog-content'
    );

    expect(dialogContent).toBeTruthy();
  });

  it('should set error on zipCode control if zip code is empty', () => {
    const zipCode = '';
    component.getAddressFromZipCode(zipCode);
    expect(
      component.addressForm.get('zipCode')?.hasError('required')
    ).toBeTruthy();
  });
});
