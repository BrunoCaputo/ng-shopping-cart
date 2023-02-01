import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DiscountFieldComponent } from '../../components/discount-field/discount-field.component';

import { ResumeComponent } from './resume.component';

describe('ResumeComponent', () => {
  let component: ResumeComponent;
  let fixture: ComponentFixture<ResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResumeComponent, DiscountFieldComponent],
      imports: [
        SharedModule,
        HttpClientTestingModule,
        AppRoutingModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show empty message if cart is empty', () => {
    const emptyTemplate = (fixture.nativeElement as HTMLElement).querySelector(
      'div.empty-cart'
    );

    if (component.cartIsEmpty()) {
      expect(emptyTemplate).toBeTruthy();
    } else {
      expect(emptyTemplate).toBeFalsy();
    }
  });

  it('should have a discount field', () => {
    const discountInput = (fixture.nativeElement as HTMLElement).querySelector(
      'div.coupon-container discount-field'
    );

    expect(discountInput).toBeTruthy();
  });

  it('should show total and subtotal', () => {
    const checkoutContainer = (
      fixture.nativeElement as HTMLElement
    ).querySelector('div.order-informations');

    const totalValueField = checkoutContainer?.querySelector(
      '.estimated-total #value'
    );

    expect(checkoutContainer?.textContent).toContain('Subtotal');
    expect(checkoutContainer?.textContent).toContain('Total');

    expect(totalValueField?.textContent).not.toEqual('');
  });
});
