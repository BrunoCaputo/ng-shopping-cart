import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { ConfirmationComponent } from './confirmation.component';

describe('ConfirmationComponent', () => {
  let component: ConfirmationComponent;
  let fixture: ComponentFixture<ConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationComponent],
      imports: [SharedModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have a successful message', () => {
    const successMessage = (fixture.nativeElement as HTMLElement).querySelector(
      '.successful-buy'
    );

    expect(successMessage?.textContent).toContain('Successful!!');
  });

  it('should have a button to continue shopping', () => {
    const continueButton = (fixture.nativeElement as HTMLElement).querySelector(
      '.payment-data button'
    );

    expect(continueButton).toBeTruthy();
  });
});
