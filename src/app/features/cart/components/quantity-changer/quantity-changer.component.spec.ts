import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { QuantityChangerComponent } from './quantity-changer.component';

describe('QuantityChangerComponent', () => {
  let component: QuantityChangerComponent;
  let fixture: ComponentFixture<QuantityChangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuantityChangerComponent],
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantityChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
