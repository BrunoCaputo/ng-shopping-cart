import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';

import { AddressTileComponent } from './address-tile.component';

describe('AddressTileComponent', () => {
  let component: AddressTileComponent;
  let fixture: ComponentFixture<AddressTileComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddressTileComponent],
      imports: [SharedModule],
      providers: [{ provide: FormBuilder, useValue: new FormBuilder() }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressTileComponent);
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

  it('should display address, zip code, city, and state', () => {
    component.address = '123 Main St';
    component.zipCode = '12345-678';
    component.city = 'Test City';
    component.state = 'Test State';
    fixture.detectChanges();

    const addressDataEl = fixture.debugElement.query(By.css('.address-data'));
    expect(addressDataEl.nativeElement.textContent.trim()).toContain(
      '123 Main St'
    );
    expect(addressDataEl.nativeElement.textContent.trim()).toContain(
      'CEP 12345-678'
    );
    expect(addressDataEl.nativeElement.textContent.trim()).toContain(
      'Test City, Test State'
    );
  });

  it('should display icon button', () => {
    const buttonEl = fixture.debugElement.query(By.css('.actions button'));
    expect(buttonEl).toBeTruthy();
  });
});
