import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountFieldComponent } from './discount-field.component';

describe('DiscountFieldComponent', () => {
  let component: DiscountFieldComponent;
  let fixture: ComponentFixture<DiscountFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscountFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DiscountFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
