import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';

import { DiscountFieldComponent } from './discount-field.component';

describe('DiscountFieldComponent', () => {
  let component: DiscountFieldComponent;
  let fixture: ComponentFixture<DiscountFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscountFieldComponent],
      imports: [SharedModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DiscountFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
